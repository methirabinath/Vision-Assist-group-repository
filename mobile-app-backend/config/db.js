const mongoose = require("mongoose");

/*
  This function establishes the connection between the backend
  server and the MongoDB database.
*/
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");

  } catch (err) {

    console.error("MongoDB connection failed:", err.message);

    // Stops the server if database fails
    process.exit(1);
  }
};

module.exports = connectDB;