const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    hotelName: {
        type: String,
    },
    hotelAddress: {
        type: String,
    },
    price: {
        type: String,
    },
    hotelImageUrl: {
        type: String,
    },
    geoCoordinates: {
        type: String,
    },
    rating: {
        type: Number,
    },
    description: {
        type: String,
    },
  });

  module.exports = HotelSchema;