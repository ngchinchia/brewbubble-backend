const mongoose = require("mongoose");
const reportAccSchema = new mongoose.Schema({
  userID: { //reported userID
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true,
  },
  adminID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  reason: {
    type: String,
  },
  accStatus: {
    type: String,
    enum: ["Banned", "Flagged"],
  },
});

// Function to fetch all wish list items from the database
reportAccSchema.statics.fetchAllReported = async function () {
  try {
    // Fetch wish list items from MongoDB using your data retrieval logic
    const data = await this.find();

    // Return the fetched data
    return data;
  } catch (error) {
    console.log("Error fetching venue data:", error);
    throw new Error("Internal server error");
  }
};


module.exports = mongoose.model("reportaccs", reportAccSchema);
