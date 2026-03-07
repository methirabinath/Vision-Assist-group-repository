const User = require("../models/User");

/*
  Handles user registration logic.
  Receives data from request body and saves user in database.
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

    // Create new user
    const newUser = await User.create({
      fullName,
      phone,
      email,
      password
    });

    res.json({
      message: "User registered successfully",
      userId: newUser._id
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server error"
    });

  }
};