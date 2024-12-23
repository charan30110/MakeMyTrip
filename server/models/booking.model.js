const mongoose = require('mongoose');

const Bookings = new mongoose.Schema({
    uname:{
        type:String,
        required:true
    },
    vehicleId:{
        type:[String]
    }
})

module.exports = mongoose.model('bookings', Bookings);