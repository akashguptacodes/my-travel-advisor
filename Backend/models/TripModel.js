
const mongoose = require('mongoose');
const Hotel = require('./HotelsModel')
const Itinerary = require('./ItineraryModal')

const TripSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  tripId: {
    type: String,
    required: true,
  },
  formData: {
    Budget: {
      type: String,
      required: true,
    },
    Days: {
      type: Number,
      required: true,
    },
    Location: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Travellers: {
      type: String,
      required: true,
    },
  },
  hotels: [Hotel],
  // itinerary: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref:'Itinerary'
  // }
  itinerary: Itinerary,
});

module.exports = mongoose.model('Trip', TripSchema);