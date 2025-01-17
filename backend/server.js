const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const donationRoutes = require('./routes/donationRoutes'); // Import donation routes
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// Connect to database
connectDB();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',  // URL of your frontend
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Ensure all required methods are allowed
  credentials: true,  // Allow sending cookies (JWT)
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/donations', donationRoutes); // Use donation routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
