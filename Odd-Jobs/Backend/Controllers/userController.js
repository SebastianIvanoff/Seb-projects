const router = require("express").Router();
const userModel = require("../Models/UserModel");
const auth = require("../Authentication/Auth");

router.post("/register", userModel.registerUser);
router.post("/login", userModel.loginUser);

module.exports = router;
