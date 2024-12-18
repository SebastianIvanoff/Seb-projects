const router = require("express").Router(); // Import and create an Express router instance
const userModel = require("../Models/UserModel"); // Import the user model with register and login functions
const auth = require("../Authentication/Auth"); // Import authentication utility (not directly used here)

// Route to handle user registration
router.post("/register", userModel.registerUser);
// Maps POST requests to "/register" to the `registerUser` function in the user model

// Route to handle user login
router.post("/login", userModel.loginUser);
// Maps POST requests to "/login" to the `loginUser` function in the user model

// Export the router to be used in other parts of the application
module.exports = router;
