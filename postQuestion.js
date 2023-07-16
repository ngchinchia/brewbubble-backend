const mongoose = require("mongoose");

const postQuestionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAnswered: {
    type: String,
    enum: ["answered", "not_answered"],
    default: "not_answered"
  },
  answers: {
    type: String,
  },
  adminID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  }
});

//Function to fetch all users from the users database
postQuestionSchema.statics.fetchAllQuestions = async function () {
  try {
    // Fetch data from MongoDB using your data retrieval logic
    const data = await this.find(); // Use `this.find()` to fetch all users from the User collection

    // Return the fetched data
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw new Error("Internal server error");
  }
};

module.exports = mongoose.model("Question", postQuestionSchema);
