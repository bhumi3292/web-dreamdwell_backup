const express = require("express");
const router = express.Router();
const {
    loginUser,
    registerUser,
    findUserIdByCredentials
} = require("../controllers/authController");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/find-user-id", findUserIdByCredentials);

module.exports = router;
