const mongoose = require("mongoose"); 

// Define the comment schema
const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
    required: true,
  },
  commentText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the like schema
const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  review: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
    required: true,
  },
  liked: {
    type: Boolean,
    default: true,
  },
});

// Define the review schema
const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  beer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Beer",
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  servingStyle: {
    type: String,
    required: true,
  },
  flavorProfile: {
    type: String,
    required: true,
  },
  purchasedVenue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue",
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [commentSchema],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }],
});

module.exports = mongoose.model("Review", reviewSchema, "reviews");
