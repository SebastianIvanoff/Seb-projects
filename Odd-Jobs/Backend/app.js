const express = require("express"); // Import Express.js library
const app = express(); // Create an instance of an Express app
const cors = require("cors"); // Import CORS (Cross-Origin Resource Sharing) library

// Middleware to enable Cross-Origin Requests (CORS)
app.use(cors()); // Allows requests from any domain by default

// Middleware to parse URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: false })); // Handle form submissions with simple query string encoding

// Middleware to parse incoming JSON data
app.use(express.json()); // Automatically parses JSON bodies from incoming requests

// Use the routes defined in the userController for the '/api/users' endpoint
app.use("/api/users", require("./Controllers/userController")); // Routes for user-related actions like login and registration

// Export the Express app to be used in other parts of the application (e.g., in server.js)
module.exports = app;
