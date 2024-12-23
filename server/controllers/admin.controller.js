const vehicleRouteModel = require('../models/vehicle.model')

const viewRoute = async(req, res)=> {
    try {
        const data = await vehicleRouteModel.find({})
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send("Internal error");
    }
}

const newRoute = async (req, res) => {
    const data = req.body;
    console.log(data)
    try {
        const isExisting = await vehicleRouteModel.findOne({ id: data.id })
        if (isExisting) {
            return res.status(400).send("Duplicate")
        } else {
            const record = await vehicleRouteModel.create(data)
            return res.status(200).send("success");
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal error")
    }
}

module.exports = {
    viewRoute,
    newRoute
}