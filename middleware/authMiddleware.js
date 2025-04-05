const jwt = require("jsonwebtoken");
require("dotenv").config();

console.log("🔥 Loaded JWT Secret Key:", process.env.JWT_SECRET); // ✅ Debug Secret Key

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🔥 Received Header:", authHeader); // ✅ Check header in backend

  if (!authHeader) {
    console.log("❌ No Authorization Header Found");
    return res.status(403).json({ message: "Access denied, no token provided (Header missing)" });
  }

  const token = authHeader.split(" ")[1];
  console.log("🔥 Extracted Token:", token); // ✅ Check token value

  if (!token) {
    console.log("❌ Token is missing in header");
    return res.status(403).json({ message: "Access denied, no token found in header" });
  }

  try {
    console.log("🔥 Using Secret Key for Verification:", process.env.JWT_SECRET); // ✅ Debugging Key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Authenticated User:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("❌ JWT Verification Failed:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticateToken;
