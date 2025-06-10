const mongoose = require("mongoose");

const CONNECTION_STRING = process.env.MONGODB_URI || "mongodb://localhost:27017/dreamDwell_db";
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const connectDB = async () => {
    try {
        await mongoose.connect(CONNECTION_STRING);
        console.log(`MongoDB connected`);
    } catch (err) {
        console.error("DB connection error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;
