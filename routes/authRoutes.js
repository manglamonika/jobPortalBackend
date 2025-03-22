// const express = require("express");
// const { registerUser, loginUser ,fetchUser} = require("../controller/authController");
// const authMiddleware = require("../middlewares/authMiddleware");
// const User = require("../models/userSchema");
// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.post("/users",authMiddleware, fetchUser);

// module.exports = router;

// const express = require('express')
// const {registerUser, loginUser, fetchUser, fetchLoggedInUser}= require("../controller/authController")
// const authenticateToken = require("../middleware/authMiddleware");

// const router = express.Router()

// router.post('/signup',registerUser)
// router.post('/login',loginUser)
// router.get('/users', fetchUser)
// router.get('/me', authenticateToken, fetchLoggedInUser);



// module.exports = router

const express = require('express');
const { registerUser, loginUser, fetchUser, fetchLoggedInUser, updateProfile } = require("../controller/authController");
const authenticateToken = require("../middleware/authMiddleware");
const multer = require("multer");

const router = express.Router();

// 🔹 Multer ka use file upload ke liye kar rahe hain
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/users', fetchUser);
router.get('/me', authenticateToken, fetchLoggedInUser);
router.put('/profile', authenticateToken, upload.fields([{ name: "resume" }, { name: "profilePhoto" }]), updateProfile);

module.exports = router;
