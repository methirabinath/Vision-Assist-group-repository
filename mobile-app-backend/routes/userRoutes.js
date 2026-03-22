const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");
const userController = require("../controllers/userController");

// Logged-in user
router.get("/me", auth, userController.getMe);

// Admin routes
router.patch("/:id/block", auth, adminOnly, userController.blockUser);
router.patch("/:id/unblock", auth, adminOnly, userController.unblockUser);

module.exports = router;