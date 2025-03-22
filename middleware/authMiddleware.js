// const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization")?.split(" ")[1]; // ✅ Bearer Token

//   if (!token) {
//     return res.status(401).json({ message: "Access Denied! No token provided." });
//   }

//   try {
//     const decoded = jwt.verify(token, "SECRET_KEY"); // ✅ Token verify kro
//     req.user = decoded; // ✅ User ka ID mil jayega
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid Token!" });
//   }
// };

// module.exports = authMiddleware;

// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticateToken;