const jwt = require("jsonwebtoken"); // Import the JSON Web Token library
require("dotenv").config(); // Load environment variables from a .env file

const secretKey = process.env.SECRET_KEY; // Retrieve the secret key from the environment variables

// Function to generate a JWT token for a user
exports.generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, userName: user.userName }, // Payload: user ID and username
    secretKey, // Secret key used to sign the token
    {
      expiresIn: "365d", // Token expiration set to 365 days
    }
  );
};

// Middleware to verify the token provided in the request
exports.verifyToken = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    // Expected format: "Bearer <token>"
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token using the secret key
    req.userData = jwt.verify(token, secretKey); // Attach decoded user data to `req`

    next(); // Proceed to the next middleware or route handler
  } catch {
    // Handle invalid or missing token
    return res.status(401).json({
      message: "Access restricted! Please Login!", // Return a 401 Unauthorized error
    });
  }
};
