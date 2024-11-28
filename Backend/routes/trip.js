const express = require('express');
const router = express.Router();
const { CreateTrip } = require('../controllers/CreateTrip');
const {ViewTrip} = require('../controllers/ViewTrip')
const {fetchMyTrips} = require('../controllers/MyTrips');
const { DeleteTrip } = require('../controllers/DeleteTrip');

// Route to save a trip
router.post('/savetrip', CreateTrip);
router.get('/delete-trip/:tripId', DeleteTrip)
router.get('/view-trip/:tripId', ViewTrip)
router.get('/my-trips', fetchMyTrips)

module.exports = router;