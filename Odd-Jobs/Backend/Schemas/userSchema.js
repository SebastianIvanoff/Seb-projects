const mongoose = require("mongoose"); // Import Mongoose library for MongoDB interaction
const { Schema } = mongoose; // Extract Schema constructor from Mongoose

// Define a schema for the User model
const userSchema = new Schema({
  userName: { 
    type: String, // Field type is String
    required: true, // Field is required
    unique: true, // Field must be unique (no duplicate userName values)
  },
  passwordHash: { 
    type: String, // Field type is String
    required: true, // Field is required
  },
});

// Export the User model based on the schema
module.exports = mongoose.model("User", userSchema);
