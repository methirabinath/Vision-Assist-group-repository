const express = require("express");
const router = express.Router();

const alertController = require("../controllers/alertController");
const auth = require("../middleware/authMiddleware");

// Device triggers fall
router.post("/fall", auth, alertController.fallAlert);

// User sends SOS
router.post("/sos", auth, alertController.sosAlert);

// Get alerts
router.get("/user/:userId", auth, alertController.getUserAlerts);

module.exports = router;