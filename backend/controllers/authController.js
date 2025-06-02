// controllers/authController.js
require("dotenv").config();
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ error: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();

    console.log("new user", user.username);
    return res.status(201).json({ message: "New user registered!" });
  } catch (e) {
    console.error("Signup error:", e);
    return res.status(400).json({ error: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;


    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    console.log("login user", user.username);
    return res.json({ token });
  } 
  catch (e) {
    console.error("Login error:", e);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { signup, login };
