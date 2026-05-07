import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { connectDB } from './src/config/db';

// Import Routes
import classRoutes from './src/routes/classRoutes';
import authRoutes from './src/routes/authRoutes';
import scheduleRoutes from './src/routes/scheduleRoutes';
import userRoutes from './src/routes/userRoutes';
import analyticsRoutes from './src/routes/analyticsRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: [
    'https://gym-engine-client.vercel.app',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

// Request Logger
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

// Database Connection and Server Start
async function startServer() {
  try {
    await connectDB();

    // Basic Route
    app.get('/', (req: Request, res: Response) => {
      res.send('GymEngine Server is running');
    });

    // Routes
    app.use('/api/v1/classes', classRoutes);
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/schedules', scheduleRoutes);
    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/analytics', analyticsRoutes);

    // Error Handler
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
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
