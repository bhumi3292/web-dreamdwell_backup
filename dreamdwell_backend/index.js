const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");

// Route imports
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// ========== Middleware ==========
app.use(cors());
app.use(express.json());

// Serve static files (e.g., uploaded images/videos)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ========== DB Connection ==========
connectDB()
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
        console.error(" Failed to connect to DB:", err);
        process.exit(1);
    });

// ========== API Routes ==========
app.use("/api/auth", authRoutes);            // Registration, Login, Reset
app.use("/api/properties", propertyRoutes);  // Property CRUD
app.use("/api/bookings", bookingRoutes);     // Booking System (if implemented)

// Health check
app.get("/", (req, res) => {
    res.send("DreamDwell backend running...");
});

// ========== Global Error Handler ==========
app.use((err, req, res, _next) => {
    console.error("Unhandled Error:", err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err.message || "Unknown error",
    });
});

// ========== Start Server ==========
if (require.main === module) {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(` Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
