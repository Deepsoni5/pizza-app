const mongoose = require('mongoose');

const Schema = mongoose.Schema
//aa class banayvo or schema
const menuSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    }
})

//aa class no object or schema nu model



//pelu parameter apda table nu nam pan singular ma
//second paramater apda schema or class nu nam

module.exports = mongoose.model("Menu", menuSchema);



