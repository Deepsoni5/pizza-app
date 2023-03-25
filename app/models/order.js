const mongoose = require('mongoose');

const Schema = mongoose.Schema
//aa class banayvo or schema
const orderSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: {
        type: Object,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        default: 'COD'
    },
    status: {
        type: String,
        default: 'order_placed'
    }
}, { timestamps: true })

//aa class no object or schema nu model



//pelu parameter apda table nu nam pan singular ma
//second paramater apda schema or class nu nam

module.exports = mongoose.model("Order", orderSchema);



