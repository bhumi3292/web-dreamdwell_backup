const express = require('express');
const router = express.Router();

// Correctly import the multer instance
const upload = require('../middlewares/property/propertyMediaUpload');

const {
    createProperty,
    getAllProperties,
    getOneProperty,
    updateProperty,
    deleteProperty
} = require("../controllers/property/propertyController");

const {
    authenticateUser,
    isLandlord,
    isPropertyOwner
} = require('../middlewares/authorizedUser');

// Create Property (Landlord Only)
router.post(
    '/create',
    authenticateUser,
    isLandlord,
    upload.fields([{ name: 'images', maxCount: 10 }, { name: 'videos', maxCount: 5 }]),
    createProperty
);

// Get all properties (public)
router.get('/', getAllProperties);

// Get single property by ID (public)
router.get('/:id', getOneProperty);

// Update Property (Landlord and Property Owner Only)
router.put(
    '/:id',
    authenticateUser,
    isLandlord,
    isPropertyOwner,
    upload.fields([{ name: 'images', maxCount: 10 }, { name: 'videos', maxCount: 5 }]),
    updateProperty
);

// Delete Property (Landlord and Property Owner Only)
router.delete(
    '/:id',
    authenticateUser,
    isLandlord,
    isPropertyOwner,
    deleteProperty
);



module.exports = router;
