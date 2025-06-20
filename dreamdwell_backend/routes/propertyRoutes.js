const express = require('express');
const router = express.Router();
// Import uploadPropertyMedia from the correct path
const { uploadPropertyMedia } = require('../middlewares/property/propertyMediaUpload');

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
    uploadPropertyMedia,
    createProperty
);


router.get('/', getAllProperties);


router.get('/:id', getOneProperty);


router.put(
    '/:id',
    authenticateUser,
    isLandlord,
    isPropertyOwner,
    uploadPropertyMedia, // Use the imported middleware directly
    updateProperty
);


router.delete(
    '/:id',
    authenticateUser,
    isLandlord,
    isPropertyOwner,
    deleteProperty
);

module.exports = router;