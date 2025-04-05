

require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth",authRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("Hello from Backend!");
});

// API to get all users

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});









// require("dotenv").config();
// const mongoose = require("mongoose");
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// const port = 3000;

// // Middleware
// app.use(cors()); // Allow frontend to connect
// app.use(bodyParser.json()); // Parse JSON request body

// console.log("Mongoose Version:", mongoose.version);

// // MongoDB Atlas Connection
// const mongoURI = "mongodb+srv://monika:monika@cluster0.hty1p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// mongoose.connect(mongoURI)
//   .then(() => console.log("✅ MongoDB Connected Successfully!"))
//   .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// // ✅ User Schema & Model
// const userSchema = new mongoose.Schema({
//   firstname: String,
//   lastName: String,
//   email: String,
//   password: String,
//   number: String,
// });

// const User = mongoose.model("User", userSchema);

// // ✅ Signup API Endpoint
// app.post("/signup", async (req, res) => {
//   try {
//     const { firstname, lastName, email, password, number } = req.body;

//     // Check if all fields are provided
//     if (!firstname || !lastName || !email || !password || !number) {
//       return res.status(400).json({ message: "All fields are required!" });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists!" });
//     }

//     // Save new user to database
//     const newUser = new User({ firstname, lastName, email, password, number });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully!", user: newUser });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// // ✅ Test Route
// app.get("/", (req, res) => {
//   res.send("Hello from Backend!");
// });

// // ✅ Start Server
// app.listen(port, () => {
//   console.log(`🚀 Server running on port ${port}`);
// });

//only server and mongodb

// const mongoose = require("mongoose");
// const express = require('express')
// const app = express()
// const port = 3000
// console.log("Mongoose Version:", mongoose.version);

// const mongoURI = "mongodb+srv://monika:monika@cluster0.hty1p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB Connected Successfully!"))
// .catch((err) => console.error("MongoDB Connection Error:", err));
// // mongodb+srv://monika:monika@cluster0.hty1p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
