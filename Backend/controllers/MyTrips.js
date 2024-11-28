const Trip = require("../models/TripModel");



exports.fetchMyTrips = async (req, res) => {
    const {email} = req.query;
    try{
        const MyTrips = await Trip.find({userEmail:email});
        res.status(200).json({
            success:true,
            message: 'Fetched all trips',
            data:MyTrips,
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message: 'Trips not found'
        })
    }
}