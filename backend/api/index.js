const app = require('../server'); // Import your Express app
const { createServer } = require('http');

// Create a serverless function
module.exports = (req, res) => {
  createServer(app).listen(req, res);
};