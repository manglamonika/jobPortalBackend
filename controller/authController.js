      
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");



const registerUser = async (req, res) => {
    const { firstName, lastName, email, password, number } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
    try {
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            number,
        });
        await newUser.save();
        res.status(201).json({ message: "User Registered Successfully" });
    } catch (error) {
        console.log("Error During signup: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.log("Error During login: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const fetchUser = async (req, res) => {
    try {
      const users = await User.find().select("-password"); // Exclude passwords
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      console.error("Error fetching users:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to fetch users",
        error: error.message,
      });
    }
  };  
      
  const fetchLoggedInUser = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password"); // Fetch logged-in user
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.error("Error fetching user:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to fetch user",
        error: error.message,
      });
    }
  };
  
//   const updateProfile = async (req, res) => {
//     try {
//       console.log("recieved form data",req.body)
//       console.log("recieved files",req.files)
//         const userId = req.user.id; // 🛑 Logged-in user ka ID le rahe hain (Middleware se aayega)

//         const { name, education, location, mobile, availability, gender } = req.body; // 🔹 Frontend se aaya hua data

//         const updateData = { name, education, location, mobile, availability, gender };

//         // 🖼️ Agar koi file (Resume ya Profile Photo) upload hui hai to use bhi save karna hai
//         if (req.files) {
//             if (req.files.resume) updateData.resume = req.files.resume[0].path;
//             if (req.files.profilePhoto) updateData.profilePhoto = req.files.profilePhoto[0].path;
//         }

//         // 📌 MongoDB me user ka data update kar rahe hain
//         const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");

//         res.status(200).json({ success: true, message: "Profile updated successfully", data: updatedUser });
//     } catch (error) {
//         console.error("Error updating profile:", error);
//         res.status(500).json({ success: false, message: "Profile update failed", error: error.message });
//     }
// };

const updateProfile = async (req, res) => {
  try {
      console.log("Received Form Data:", req.body);
      console.log("Received Files:", req.files);

      const userId = req.user.id; // 🛑 Logged-in user ka ID middleware se aayega

      // 🔹 Pehle se database me user ka data fetch karein
      const existingUser = await User.findById(userId);
      if (!existingUser) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      // 🔹 Jo fields frontend se aaye hain unhi ko update karein, baki old values rakhein
      const updateData = { 
          bio: req.body.bio || existingUser.bio,
          education: req.body.education || existingUser.education,
          location: req.body.location || existingUser.location,
          mobile: req.body.mobile || existingUser.mobile,
          availability: req.body.availability || existingUser.availability,
          gender: req.body.gender || existingUser.gender,
          resume: existingUser.resume,  // Default me purana resume rakhein
          profilePhoto: existingUser.profilePhoto  // Default me purana profile photo rakhein
      };

      // 🖼️ Agar koi file upload hui hai to sirf wahi update karein
      if (req.files) {
          if (req.files.resume) updateData.resume = req.files.resume[0].path;
          if (req.files.profilePhoto) updateData.profilePhoto = req.files.profilePhoto[0].path;
      }

      // 📌 User ka data update kar rahe hain bina baki fields ko remove kiye
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select("-password");

      res.status(200).json({ success: true, message: "Profile updated successfully", data: updatedUser });
  } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ success: false, message: "Profile update failed", error: error.message });
  }
};



  






module.exports = { registerUser, loginUser, fetchUser,fetchLoggedInUser,updateProfile };