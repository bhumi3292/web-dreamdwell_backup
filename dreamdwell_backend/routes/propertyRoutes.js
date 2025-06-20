const express = require('express');
const router = express.Router();

const {
    createProperty,
    getAllProperties,
    getOneProperty,
    updateProperty,
    deleteProperty
} = require("../controllers/property/propertyController");

const upload = require('../middlewares/property/multer');
const {
    authenticateUser,
    isLandlord,
    isPropertyOwner
} = require('../middlewares/authorizedUser');

// ✅ Create Property (Landlord Only)
router.post(
    '/create',
    authenticateUser,
    isLandlord,
    upload.fields([{ name: 'images' }, { name: 'videos' }]),
    createProperty
);


router.get('/', getAllProperties);


router.get('/:id', getOneProperty);


router.put(
    '/:id',
    authenticateUser,
    isLandlord,
    isPropertyOwner,
    upload.fields([{ name: 'images' }, { name: 'videos' }]),
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
