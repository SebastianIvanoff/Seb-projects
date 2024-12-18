const app = require("./app"); // Import the Express app instance from the app.js file
const mongoose = require("mongoose"); // Import Mongoose library for MongoDB interactions
require("dotenv").config(); // Load environment variables from a .env file

// Set the port to either the value in the environment or a default of 9999
const PORT = process.env.PORT || 9999;

// Start the Express server and listen on the specified port
app.listen(PORT, () =>
  console.log("Server running at http://localhost:" + PORT) // Log a message once the server is running
);

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URI) // Use the MongoDB URI from the environment variables
  .then(() => console.log("Connected to DB")) // Log a success message upon successful connection
  .catch((err) => console.log(err.message)); // Log any errors that occur during the connection process
