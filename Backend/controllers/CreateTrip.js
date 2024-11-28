const Trip = require('../models/TripModel');


exports.CreateTrip =  async (req, res) => {
    const { userEmail, tripId, formData, hotels, itinerary } = req.body;
  
    const newTrip = new Trip({
      userEmail,
      tripId,
      formData,
      hotels,
      itinerary,
    });
  
    try {
      const savedTrip = await newTrip.save();
      res.status(201).json({ success: true, trip: savedTrip });
    } catch (error) {
      console.error('Error saving trip:', error);
      res.status(500).json({ success: false, message: 'Failed to save trip' });
    }
  }