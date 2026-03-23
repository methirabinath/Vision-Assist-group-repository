const Alert = require("../models/Alert");

//FALL alert
exports.fallAlert = async (req, res) => {
  try {
    const userId = req.user.id;
    const { latitude, longitude } = req.body;

    const alert = await Alert.create({
      userId,
      type: "FALL",
      latitude,
      longitude
    });

    // Send real time alert
    const io = req.app.get("io");
    io.emit("fallAlert", {
      userId,
      latitude,
      longitude,
      time: new Date()
    });

    res.json({
      message: "Fall alert saved & broadcasted",
      alertId: alert._id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//SOS alert
exports.sosAlert = async (req, res) => {
  try {
    const userId = req.user.id;
    const { message, latitude, longitude } = req.body;

    const alert = await Alert.create({
      userId,
      type: "SOS",
      message,
      latitude,
      longitude
    });

    // Send real time alert
    const io = req.app.get("io");
    io.emit("sosAlert", {
      userId,
      message,
      latitude,
      longitude,
      time: new Date()
    });

    res.json({
      message: "SOS alert saved & broadcasted",
      alertId: alert._id
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

//Get alerts
exports.getUserAlerts = async (req, res) => {
  try {
    const userId = req.params.userId;

    const alerts = await Alert.find({ userId }).sort({ createdAt: -1 });

    res.json({
      count: alerts.length,
      alerts
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};