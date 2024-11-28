const Trip = require("../models/TripModel");


exports.DeleteTrip = async (req, res) => {
    const  {tripId} = req.params;
    try{
        const deletedTrip = await Trip.findOneAndDelete({tripId:tripId})
        res.status(200).json({
            success:true,
            message:'Deleted the trip',
            data:deletedTrip,
        })
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}