const User = require("../models/User");
const bcrypt = require("bcryptjs");

/*
  Handles user registration logic.
*/
exports.register = async (req, res) => {
  try {
    const { fullName, phone, email, password } = req.body;

    // Basic validation
    if (!fullName || !phone || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or phone already exists"
      });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      fullName,
      phone,
      email,
      password: hashedPassword
    });

    res.json({
      message: "User registered successfully",
      userId: newUser._id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/*
  Handles user login logic.
*/
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      userId: user._id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};