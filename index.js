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
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Request Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

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
    app.use('/api/v1/auth', require('./src/routes/authRoutes'));
    app.use('/api/v1/schedules', require('./src/routes/scheduleRoutes'));

    // Error Handler
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ success: false, message: "Something went wrong on the server" });
    });

    app.listen(port, () => {
      console.log(`Server is breathing on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();
