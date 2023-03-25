const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const homeController = require('../app/http/controllers/homeController')
const orderController = require("../app/http/controllers/customers/orderController")
const adminOrderController = require("../app/http/controllers/admin/orderController")
const statusController = require("../app/http/controllers/admin/statusController")

//middlewares
const auth = require("../app/http/middlewares/auth")
const guest = require("../app/http/middlewares/guest")
const admin = require('../app/http/middlewares/admin')

function initRoutes(app) {

    //second parameter ma req,res aavi jay etle index ma avi jase
    app.get('/', homeController().index)
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)
    app.post('/logout', authController().logout)

    //customer routes
    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)
    app.get('/customer/orders/:id', auth, orderController().show)

    app.get('/cart', cartController().index)

    app.post('/update-cart', cartController().update)

    //admin routes
    app.get('/admin/orders', admin, adminOrderController().index)
    app.post('/admin/order/status', admin, statusController().update)

}

module.exports = initRoutes