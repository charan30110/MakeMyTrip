const vehicleRouteModel = require('../models/vehicle.model')
const bookingsModel = require('../models/booking.model')
const mongoose = require('mongoose')

const book = async (req, res) => {
    const data = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { uname, id } = data
        let vehicleRecord = await vehicleRouteModel.findOne({ id: id })
        if (!vehicleRecord) {
            return res.status(404).send("Vehicle not found");
        }
        if (vehicleRecord.passengers.includes(uname)) {
            return res.status(400).send("Already Booked")
        }
        if (vehicleRecord.capacity == vehicleRecord.passengers.length) {
            return res.status(400).send("No Seats Left")
        }
        vehicleRecord.passengers.push(uname)
        let customerBookings = await bookingsModel.findOne({ uname: uname })
        if (!customerBookings) {
            return res.status(404).send("Customer booking record not found");
        }
        customerBookings.vehicleId.push(id)
        vehicleRecord.save()
        customerBookings.save()
        await session.commitTransaction();
        return res.status(200).send("Booking Successful")
    } catch (error) {
        await session.abortTransaction();
        console.log(error);
        return res.status(500).send('Internal Error')
    } finally {
        session.endSession();
    }
}

const cancel = async (req, res) => {
    const data = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { uname, id } = data
        let vehicleRecord = await vehicleRouteModel.findOne({ id: id })
        if (!vehicleRecord) {
            return res.status(404).send("Vehicle not found");
        }
        if (!vehicleRecord.passengers.includes(uname)) {
            return res.status(400).send("No Booking Found")
        }
        vehicleRecord.passengers = vehicleRecord.passengers.filter(passenger => passenger !== uname);
        let customerBookings = await bookingsModel.findOne({ uname: uname })
        if (!customerBookings) {
            return res.status(404).send("Customer booking record not found");
        }
        customerBookings.vehicleId = customerBookings.vehicleId.filter(vehicle => vehicle !== id);
        vehicleRecord.save()
        customerBookings.save()
        await session.commitTransaction();
        return res.status(200).send("Cancellation Successful")
    } catch (error) {
        await session.abortTransaction();
        console.log(error);
        return res.status(500).send('Internal Error')
    } finally {
        session.endSession();
    }
}

const view = async (req, res) => {
    const { uname } = req.body
    try {
        let customerBookings = await bookingsModel.findOne({ uname: uname })
        let vehicleIds = customerBookings.vehicleId;
        let data = []
        for (const id of vehicleIds) {
            let record = await vehicleRouteModel.findOne({ id: id })
            if (record) {
                let plainRecord = record.toObject();
                delete plainRecord.passengers;
                data.push(plainRecord)
            }
        }
        return res.status(200).send(data)
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Error')
    }
}

module.exports = {
    view,
    book,
    cancel
}