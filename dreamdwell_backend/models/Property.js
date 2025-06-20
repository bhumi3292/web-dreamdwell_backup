const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    image:{
        type:String,
        require:true,
    },
    video: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    bedrooms: { type: Number, required: false },
    bathrooms: { type: Number, required: false },
    categoryId: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true,
    },
    price: {
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
