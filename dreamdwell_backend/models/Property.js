const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    image:{
        type:String,
        require:true,
    },

    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
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
    available: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
