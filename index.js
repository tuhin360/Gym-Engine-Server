const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { connectDB } = require('./src/config/db');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: ['http://localhost:3000'], // Adjust to your client URL
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Database Connection and Server Start
async function startServer() {
  try {
    await connectDB();
    
    // Basic Route
    app.get('/', (req, res) => {
      res.send('GymEngine Server is running');
    });

    // Routes
    app.use('/api/v1/classes', require('./src/routes/classRoutes'));

    app.listen(port, () => {
      console.log(`Server is breathing on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();
