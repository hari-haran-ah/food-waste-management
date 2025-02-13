const app = require('../server'); // Import your Express app

// Export the app as a Vercel serverless function
module.exports = async (req, res) => {
  // Forward the request to the Express app
  app(req, res);
};