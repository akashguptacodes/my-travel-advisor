const Trip = require('../models/TripModel')

exports.ViewTrip = async (req, res) => {
    const {tripId} = req.params;

    try{
        const currentTrip = await Trip.findOne({tripId:tripId});
        res.status(200).json({
            message: "Trip found",
            success: true,
            data: currentTrip,
        })
    }
    catch(error){
        res.status(404).json({
            message: 'Trip not found',
            success: false,

        })
    }
}