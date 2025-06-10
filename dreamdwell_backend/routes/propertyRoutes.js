const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/propertyController");
const { protect } = require("../middlewares/auth");

// Create a property (protected, landlord only)
router.post("/", protect, propertyController.createProperty);

// Get all properties (public)
router.get("/", propertyController.getAllProperties);

// Export router
module.exports = router;
