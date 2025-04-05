const jobPoster = require('../models/jobPosterSchema');
const jwt = require('jsonwebtoken');


// Create Job Poster Profile
exports.createJobPoster = async (req, res) => {
    try {
        const { companyName, companyDescription, hrEmail, companyLocation, socialMedia } = req.body;

        // Check if email already exists
        const existingPoster = await jobPoster.findOne({ hrEmail });
        if (existingPoster) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create new job poster
        const newJobPoster = new jobPoster({
            companyName,
            companyDescription,
            hrEmail,
            companyLocation,
            socialMedia
        });

        await newJobPoster.save();

        // Generate JWT token
        const token = jwt.sign(
            { email: newJobPoster.hrEmail },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }  // ✅ Corrected format
        );

        // Log secret key and token
        console.log("Secret Key Used for Signing:", "your-secret-key");
        console.log("Generated Token:", token);

        // ✅ Send token in response
        res.status(201).json({ 
            message: "Job poster profile created successfully",
            newJobPoster,
            token  // ✅ Now sending the token to the frontend
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Job Poster Profile
exports.getJobPosterProfile = async (req, res) => {
    try{
        const jobs = await jobPoster.find();
        res.status(200).json(jobs)
    }catch(err){
        res.status(500).json({message:"Error Fetching Jobs", error:err.message});
    } 
};
