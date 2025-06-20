const Property = require("../../models/Property");

// Helper: extract file paths from multer uploads
const extractFilePaths = (files) => {
    if (!files) return [];
    return files.map(file => file.path || file.filename);
};

// CREATE Property
exports.createProperty = async (req, res) => {
    try {
        const { title, description, location, pricePerMonth, categoryId } = req.body;

        if (!title || !description || !location || !pricePerMonth || !categoryId) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const images = extractFilePaths(req.files?.images);
        const videos = extractFilePaths(req.files?.videos);

        const property = new Property({
            title,
            description,
            location,
            pricePerMonth,
            categoryId,
            images,
            videos,
            landlord: req.user._id
        });

        await property.save();

        res.status(201).json({ success: true, message: "Property created", data: property });
    } catch (err) {
        console.error("Create error:", err.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// GET All Properties with Pagination + Search
exports.getAllProperties = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;
        const skip = (page - 1) * limit;

        const filter = {};
        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }

        const properties = await Property.find(filter)
            .populate("categoryId", "category_name")
            .populate("landlord", "fullName email")
            .skip(skip)
            .limit(Number(limit));

        const total = await Property.countDocuments(filter);

        res.status(200).json({
            success: true,
            message: "Data fetched",
            data: properties,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// GET Single Property
exports.getOneProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
            .populate("categoryId", "category_name")
            .populate("landlord", "fullName email");

        if (!property) {
            return res.status(404).json({ success: false, message: "Property not found" });
        }

        res.status(200).json({ success: true, data: property });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// UPDATE Property
exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ success: false, message: "Property not found" });
        }

        if (property.landlord.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }

        const images = extractFilePaths(req.files?.images);
        const videos = extractFilePaths(req.files?.videos);

        Object.assign(property, req.body);
        if (images.length > 0) property.images = [...property.images, ...images];
        if (videos.length > 0) property.videos = [...property.videos, ...videos];

        await property.save();

        res.status(200).json({ success: true, message: "Property updated", data: property });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

// DELETE Property
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ success: false, message: "Property not found" });
        }

        if (property.landlord.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }

        await property.deleteOne();

        res.status(200).json({ success: true, message: "Property deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};
