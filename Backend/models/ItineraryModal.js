const mongoose = require('mongoose');
const Plan = require('./PlanModel');

// const ItinerarySchema = new mongoose.Schema({
//     days: {
//         type: Map,
//         of: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Day'
//         }
//       },
    
// });

// const itinerarySchema = new mongoose.Schema({
//     days: {
//       type: Map,
//       of: new mongoose.Schema({
//         plan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true }],
//         bestTime: { type: String, required: true },
//       }),
//     },
//     // Add other fields as needed
//   });


// const itinerarySchema = new mongoose.Schema({
//     day1: {
//       plan: [{ type: mongoose.Schema.Types.ObjectId, required: true }], // adjust the type here as needed
//       bestTime: String,
//     },
//     day2: {
//       plan: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
//       bestTime: String,
//     },
//     // Add more days as needed
//   });
  


  const itinerarySchema = new mongoose.Schema({
    day1: {
        bestTime:{
            type:String,
        },
        plan: [Plan],
    },
    day2: {
        bestTime:{
            type:String,
        },
        plan: [Plan],
    },
    day3: {
        bestTime:{
            type:String,
        },
        plan: [Plan],
    },
    day4: {
        bestTime:{
            type:String,
        },
        plan: [Plan],
    },
    day5: {
        bestTime:{
            type:String,
        },
        plan: [Plan],
    },
    day6: {
        bestTime:{
            type:String,
        },
        plan: [Plan],
    },
    day7: {
        bestTime:{
            type:String,
        },
        plan: [Plan],
    },
  });
  

// module.exports = mongoose.model('Itinerary', itinerarySchema);
module.exports = itinerarySchema;
