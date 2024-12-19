const Mongoose = require('mongoose')
const Users = new Mongoose.Schema({
    uname: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        required: true,
        type: String
    },
    role: {
        type: String,
        required: true,
        // enum : ["admin","staff","customer","owner"]
    }
})
module.exports = Mongoose.model('users', Users)