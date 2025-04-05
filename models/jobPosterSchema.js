const mongoose = require("mongoose");

const jobPosterSchema = new mongoose.Schema({
  companyName: { type: String , required:true},
  companyDescription: { type: String },
  hrEmail: { type: String , unique:true },
  companyLocation: { type: String },
  socialMedia: { type: String },
}, { timestamps: true });

 const jobPoster = mongoose.model("JobPoster", jobPosterSchema);

module.exports = jobPoster;