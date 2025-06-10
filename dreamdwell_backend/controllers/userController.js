const User = require("../models/User");
const bcrypt = require("bytes");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, role, password, profilePicture } = req.body;

        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({ message: "Email already in use" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            fullName,
            email,
            phoneNumber,
            role,
            password: hashedPassword,
            profilePicture
        });

        await user.save();
        res.status(201).json({ message: "User registered", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: "1d" });

        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json({ message: "User updated", updatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
