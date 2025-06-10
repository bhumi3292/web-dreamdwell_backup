const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')

// Register User
exports.registerUser = async (req, res) => {
    const { fullName, email, phoneNumber, stakeholder, password, confirmPassword } = req.body;

    if (!fullName || !email || !phoneNumber || !stakeholder || !password || !confirmPassword) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    if (!["Landlord", "Tenant"].includes(stakeholder)) {
        return res.status(400).json({ success: false, message: "Stakeholder must be 'Landlord' or 'Tenant'" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            phoneNumber,
            role: stakeholder,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (err) {
        console.error("Registration Error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    try {
        console.log("Finding user by email:", email);
        const user = await User.findOne({ email });
        console.log(user)

        if (!user) {
            console.log("User not found");
            return res.status(404).json({ success: false, message: "User not found" });
        }

        console.log("Comparing passwords...");
        const passwordMatch = bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            console.log("Password mismatch");
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const payload = {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            stakeholder: user.role // role is where stakeholder is stored
        };
        console.log("Generating token...");

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

        const { password: _, ...userData } = user.toObject();

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            data: userData
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get User ID by Email, Password, and Stakeholder
exports.findUserIdByCredentials = async (req, res) => {
    const { email, password, stakeholder } = req.body;

    if (!email || !password || !stakeholder) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email, role: stakeholder });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found with provided credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        return res.status(200).json({ success: true, userId: user._id });
    } catch (err) {
        console.error("User ID Fetch Error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
