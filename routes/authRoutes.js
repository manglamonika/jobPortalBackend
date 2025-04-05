


// module.exports = router

const express = require('express');
const { registerUser, loginUser, fetchUser, fetchLoggedInUser, updateProfile } = require("../controller/authController");
const authenticateToken = require("../middleware/authMiddleware");
const { createJobPoster ,getJobPosterProfile } = require("../controller/jobPosterController");

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
//authentication routes
router.post('/signup', registerUser);
router.post('/login', loginUser);

//user routes
router.get('/users', fetchUser);
router.get('/me', authenticateToken, fetchLoggedInUser);

//updateProfile route
router.put('/profile', authenticateToken, upload.fields([{ name: "resume" }, { name: "profilePhoto" }]), updateProfile);

router.post("/jobPoster", createJobPoster);
router.get('/jobPoster', getJobPosterProfile); // Protecting the route
module.exports = router;
