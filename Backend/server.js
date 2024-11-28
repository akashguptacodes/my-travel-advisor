const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes/trip');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Allow only your frontend
  methods: ['GET', 'POST'], // Specify allowed methods
  credentials: true // Allow credentials if needed
}));
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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
