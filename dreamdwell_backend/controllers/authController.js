const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken'); // Ensure this is correctly imported

// Register User (No changes needed here)
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
            role: stakeholder, // Schema uses 'role', so map 'stakeholder' to 'role'
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (err) {
        console.error("Registration Error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Login User (Modified to fix login and show Navbar elements)
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    try {
        console.log("Backend: Finding user by email:", email);
        const user = await User.findOne({ email });
        console.log("Backend: User found:", user ? user.email : "none"); // Log user email if found

        if (!user) {
            console.log("Backend: User not found for email:", email);
            return res.status(404).json({ success: false, message: "User not found" });
        }

        console.log("Backend: Comparing passwords...");
        // CRITICAL FIX: AWAIT the bcrypt.compare function
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            console.log("Backend: Password mismatch for user:", email);
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Payload for JWT token (contains data for authentication middleware)
        const payload = {
            _id: user._id,
            email: user.email,
            // fullName is usually NOT in JWT payload, but 'role' (stakeholder) is crucial for middleware
            stakeholder: user.role // Using 'role' from schema, which matches 'stakeholder' in payload
        };
        console.log("Backend: Generating token with payload:", payload);

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Prepare the user data to send to the frontend
        // Exclude the password for security
        const { password: _, ...userWithoutPassword } = user.toObject();

        // Ensure userWithoutPassword contains fullName and role (from schema)
        console.log("Backend: User data sent to frontend:", userWithoutPassword);

        // CRITICAL FIX: Change 'data: userData' to 'user: userWithoutPassword'
        // This matches what your frontend LoginForm expects.
        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: userWithoutPassword // Frontend expects 'user' key
        });

    } catch (err) {
        console.error("Backend: Login Error:", err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get User ID by Email, Password, and Stakeholder (No changes needed here)
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