const mongoose = require("mongoose");

//Alert schema represents emergency alerts triggered by device
const alertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    enum: ["FALL", "SOS"],
    required: true
  },
  message: {
    type: String
  },
  latitude: Number,
  longitude: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Alert", alertSchema);