const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const donationRoutes = require('./routes/donationRoutes');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// Connect to database
connectDB();

// Middlewares
const cors = require('cors');

// Allow requests from your frontend domain
const allowedOrigins = [
  'https://food-waste-management-20.vercel.app',
  'http://localhost:5173', // For local development
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., mobile apps, curl requests)
      if (!origin) return callback(null, true);

      // Check if the origin is allowed
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Allow these HTTP methods
    credentials: true, // Allow cookies (JWT)
  })
);
app.use(express.json());
app.use(cookieParser());

// Root route


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes);

// Start server (for local development)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the app for Vercel
module.exports = app;