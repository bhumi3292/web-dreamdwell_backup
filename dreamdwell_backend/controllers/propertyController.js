const Property = require("../models/Property");

// Create Property (Landlord only)
exports.createProperty = async (req, res) => {
    try {
        const { title, description, location, price } = req.body;

        if (!title || !description || !location || !price) {
            return res.status(400).json({
                success: false,
                message: "All fields (title, description, location, price) are required.",
            });
        }

        if (!req.user || !req.user._id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized. Landlord ID is missing.",
            });
        }

        const newProperty = new Property({
            title,
            description,
            location,
            pricePerMonth: price,
            landlord: req.user._id,
        });

        await newProperty.save();

        res.status(201).json({
            success: true,
            message: "Property listed successfully",
            property: newProperty,
        });
    } catch (err) {
        console.error("Error creating property:", err.message);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
};

// Get All Properties
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find().populate("landlord", "fullName email");
        res.status(200).json({
            success: true,
            count: properties.length,
            properties,
        });
    } catch (err) {
        console.error("Error fetching properties:", err.message);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
};
