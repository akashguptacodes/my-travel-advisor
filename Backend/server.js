const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes/trip');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: process.env.Frontend_URL,
  methods: ['GET', 'POST'], // Specify allowed methods
  credentials: true, // Allow credentials if needed
  allowedHeaders: ['Content-Type', 'Authorization']
}));
console.log(process.env.Frontend_URL);

app.use(express.json());

connectDB();

app.get('/', (req,res) => {
  res.json('Hello')
})
app.use('/api/v1', router);

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

module.exports = app;
