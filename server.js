require('dotenv').config()
const express = require('express');
const app = express();
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')
const passport = require('passport');
const Emitter = require("events")
//database connection
const url = 'mongodb://localhost/pizza';
mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
});



// let mongoStore = new MongoDbStore({
//     mongooseConnection: connection,
//     collection: 'sessions'
// })
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)

//session configuration
//session middleware che etle app.use ma lakhvu and eno object
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
        // mongoUrl: process.env.MONGO_CONNECTION_URL
        client: connection.getClient()
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours

}))

//passport config
const passportInit = require("./app/config/passport")
passportInit(passport)
app.use(passport.initialize())

app.use(passport.session())
//resources na folder ma j js k css lakhsu e j main che
//public na folder ma to khali compile krine avse doesnt matter
//assets
app.use(flash())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

//set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

//routes pachi j ava joi

//web.js ma bdha route k che so e file include kri didhi
require('./routes/web')(app)


const server = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

//socket
const io = require('socket.io')(server)
io.on('connection', (socket) => {
    // Join
    socket.on('join', (orderId) => {
        socket.join(orderId)
    })
})

eventEmitter.on('orderUpdated', (data) => {

    io.to(`order_${data.id}`).emit('orderUpdated', data)
})








