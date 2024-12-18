const User = require("../Schemas/userSchema"); // Import the User model
const bcryptjs = require("bcryptjs"); // Import bcryptjs for password hashing
const auth = require("../Authentication/Auth"); // Import authentication utility

// Register a new user
exports.registerUser = async (req, res) => {
  const { userName, password, confirmPassword } = req.body; // Extract data from the request body

  // Check if all required fields are provided
  if (!userName || !password || !confirmPassword) {
    return res.status(400).json({
      message: "You need to fill all the fields", // Return an error if fields are missing
    });
  }

  // Ensure the passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "Passwords do not match", // Return an error if passwords do not match
    });
  }

  // Check if a user with the same username already exists
  const userExist = await User.exists({ userName: req.body.userName });
  if (userExist) {
    return res.status(400).send({ message: "User already exists" }); // Return an error if the username is taken
  }

  // Generate a salt for hashing the password
  const salt = bcryptjs.genSaltSync(10);

  // Hash the password
  bcryptjs.hash(password, salt, (err, hash) => {
    if (err) {
      return res.status(500).json({
        message: "Failed when encrypting the password", // Return an error if hashing fails
      });
    }

    // Create a new user with the hashed password
    User.create({
      passwordHash: hash,
      userName,
    }).then((user) => {
      // Respond with a generated token for the new user
      res.status(201).json({
        token: auth.generateToken(user),
      });
    });
  });
};

// Login a user
exports.loginUser = (req, res) => {
  const { userName, password } = req.body; // Extract data from the request body

  // Check if all required fields are provided
  if (!userName || !password) {
    return res.status(400).json({
      message: "You need to enter all fields", // Return an error if fields are missing
    });
  }

  // Find the user in the database by username
  User.findOne({ userName }).then((user) => {
    if (!user) {
      return res.status(401).json({
        message: "Incorrect credentials", // Return an error if the user does not exist
      });
    }

    // Compare the provided password with the stored hashed password
    bcryptjs.compare(password, user.passwordHash, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Something went wrong when decrypting the password", // Return an error if comparison fails
        });
      }
      if (!result) {
        return res.status(401).json({
          message: "Incorrect credentials", // Return an error if the passwords do not match
        });
      }

      // Respond with a token and user ID if login is successful
      res.status(200).json({
        token: auth.generateToken(user),
        userId: user._id,
        userName: user.userName,
      });
    });
  });
};
