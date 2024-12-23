const mongoose = require('mongoose');

const VehicleRoute = new mongoose.Schema({
    id: { 
        type: String, 
        required: true, 
        unique: true 
    },
    mode:{
        type: String, 
        required: true, 
        enum:['car','bus','Flight']
    },
    from:{
        type: String, 
        required: true, 
    },
    to:{
        type: String, 
        required: true, 
    },
    startsAt:{
        type: String, 
        required: true, 
    },
    duration:{
        type: String, 
        required: true, 
    },
    passengers: { 
        type: [String]
    },
    capacity:{
        type:String,
        required: true,
    }
});

module.exports = mongoose.model('vehicleRoute', VehicleRoute);