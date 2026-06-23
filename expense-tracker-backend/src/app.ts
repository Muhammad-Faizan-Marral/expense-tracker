import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'; // Import auth routes
import transactionRoutes from './routes/transaction.routes.js'; // Import line
import analyticsRoutes from './routes/analytics.routes.js'; // New Import
import aiRoutes from './routes/ai.routes.js'; // Import AI routes
import reportRoutes from './routes/report.routes.js'; // New Report Import
import chartsRoutes from './routes/charts.routes.js'; // New Charts Router Import
const app: Application = express();

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Base Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Expense Tracker API' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/reports', reportRoutes); // Register report endpoint
app.use('/api/charts', chartsRoutes);
export default app;