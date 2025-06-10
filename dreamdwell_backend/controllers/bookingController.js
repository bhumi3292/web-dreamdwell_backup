const Booking = require("../models/Booking");
const Property = require("../models/Property");

// Create Booking (Tenant only)
const createBooking = async (req, res) => {
    const { propertyId, startDate, endDate } = req.body;

    if (!propertyId || !startDate || !endDate) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const booking = new Booking({
            property: propertyId,
            tenant: req.user._id,
            startDate,
            endDate,
        });

        await booking.save();
        res.status(201).json({ success: true, message: "Booking successful", booking });
    } catch (err) {
        console.error("Create booking error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get My Bookings (Tenant)
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ tenant: req.user._id }).populate("property");
        res.status(200).json({ success: true, bookings });
    } catch (err) {
        console.error("Get bookings error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = {
    createBooking,
    getMyBookings,
};
