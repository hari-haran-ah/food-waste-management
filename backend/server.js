const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const donationRoutes = require('./routes/donationRoutes');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// Connect to the database
connectDB();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',  // Update this if your frontend URL changes
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);

module.exports = app;
