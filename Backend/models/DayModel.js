const mongoose = require('mongoose');


const DaySchema = new mongoose.Schema({
    plan: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan',
        required:true,
    }],
    bestTime: {
        type: String,
        required: true,
    }
  });

  module.exports = mongoose.model('Day', DaySchema)



  //not required