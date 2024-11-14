const jwt = require("jsonwebtoken");

const authMiddleware = (req) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return null;

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userId;
    } catch (err) {
        throw new Error("Invalid or expired token");
    }
};

module.exports = authMiddleware;
