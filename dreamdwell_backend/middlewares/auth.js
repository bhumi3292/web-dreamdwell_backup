const jwt = require("jsonwebtoken");

// Middleware to authenticate users using JWT
const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Access token missing" });
    }

    const token = authHeader.split(" ")[1];

    try {
        // Decode and attach user info to request object
        req.user = jwt.verify(token, process.env.SECRET);
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

// Role-based middleware generator
const requireRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.stakeholder === role) {
            next();
        } else {
            return res.status(403).json({ success: false, message: `Access denied: ${role} only` });
        }
    };
};

module.exports = {
    protect: authenticateUser,
    requireRole,
};
