const mongoose = require('mongoose');

const Schema = mongoose.Schema
//aa class banayvo or schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'customer'
    }
}, { timestamps: true })

//aa class no object or schema nu model



//pelu parameter apda table nu nam pan singular ma
//second paramater apda schema or class nu nam

module.exports = mongoose.model('User', userSchema)



