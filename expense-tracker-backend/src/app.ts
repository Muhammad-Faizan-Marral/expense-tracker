import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

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

export default app;