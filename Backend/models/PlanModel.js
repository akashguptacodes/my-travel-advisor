const mongoose = require('mongoose');


const PlanSchema = new mongoose.Schema({
    placeName: {
        type: String,
        required: true,
    },
    placeDetails: {
        type: String,
        required: true,
    },
    placeImageUrl: {
        type: String,
        // required: true,
    },
    geoCoordinates: {
        type: String,
        // required: true,
    },
    ticketPricing: {
        type: String,
        required: true,
    },
    timeToTravel: {
        type: String,
        required: true,
    },
})

module.exports = PlanSchema;