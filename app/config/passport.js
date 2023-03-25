const LocalStrategy = require("passport-local").Strategy
const User = require("../models/user")
const bcrypt = require("bcrypt")
function init(passport) {
    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, async (email, password, done) => {
        //login
        const user = await User.findOne({ email: email })
        if (!user) {
            return done(null, false, { message: 'No User With This Email!' })
        }
        bcrypt.compare(password, user.password).then(match => {
            if (match) {
                return done(null, user, { message: 'Logged In Succesfully' })
            }

            return done(null, false, { message: 'Wrong UserName Or Password !' })
        }).catch(err => {
            return done(null, false, { message: 'Something Went Wrong !' })
        })

    }))

    // passport.serializeUser((user, done) => {
    //     done(null, user._id)
    // })

    // passport.deserializeUser(async (id, done) => {
    //     User.findOne({ _id: id }).then(function (err, user) {
    //         done(user)
    //     }).catch((err) => {
    //         console.log(err)
    //     });
    //     // const user = await User.findById(id);
    //     // // return done(user)
    //     // // res.send(user)

    //     // User.findById(id, function (err, user) {
    //     //     done(err, user)
    //     // });

    // })

    passport.serializeUser(function (user, cb) {
        process.nextTick(function () {
            cb(null, { id: user.id, username: user.username });
        });
    });

    passport.deserializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
    });
}

module.exports = init