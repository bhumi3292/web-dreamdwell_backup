const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    images:{
        type:[String],
        required:true,
    },
    videos: {
        type: [String],
    },
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true,
    },
    pricePerMonth: {
        type: Number,
        required: true,
    },
    description: String,
    landlord: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
