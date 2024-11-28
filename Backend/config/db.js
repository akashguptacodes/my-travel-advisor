const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {

    });
    console.log('DB connection successfull');
  } catch (error) {
    console.error('DB connection failed', error);
    process.exit(1);
  }
};

module.exports = connectDB;
