const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Remove the deprecated options
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error);
    
    console.log(process.env.MONGO_URI); // Log the URI to see if it's correct
    process.exit(1);
  }
};

module.exports = connectDB;

