const Order = require("../../../models/order")
function statusController() {
    return {
        update(req, res) {
            Order.updateOne({ _id: req.body.orderId }, { status: req.body.status }).then(function (data) {
                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('orderUpdated', { id: req.body.orderId, status: req.body.status })
                console.log(req.app.get('eventEmitter'))
                return res.redirect("/admin/orders")
                //emitter


            }).catch(function (err) {

                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('orderUpdated', { id: req.body.orderId, status: req.body.status })

                return res.redirect("/admin/orders")

            })
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('orderUpdated', { id: req.body.orderId, status: req.body.status })




        }
    }
}
module.exports = statusController