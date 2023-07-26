/* Database for beer */
/* defines a user schema, including validation requirements, 
and exports it as a Mongoose model. It also provides a static method to check if an email is already in use by an existing user. */

const mongoose = require("mongoose");

const beerSchema = new mongoose.Schema({
  beerName: {
    type: String,
    required: true,
  },
  beerAlcoholPercentage: {
    type: Number,
  },
  beerDesc: {
    type: String,
  },
  beerStyle: {
    type: String,
  },
  beerImage: {
    type: String,
  },
  brewerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  rating: {
    type: Number,
    default: 0, 
  }
});

// Function to calculate and set the average rating for the beer
async function calculateAverageRating(beerId) {
  try {
    const reviews = await mongoose.model("Review").find({ beer: beerId }, 'rating');
    const numReviews = reviews.length;
    if (numReviews === 0) {
      return 0; // Return 0 if there are no reviews for the beer
    }
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = sum / numReviews;
    return averageRating;
  } catch (error) {
    console.log("Error calculating average rating:", error);
    throw new Error("Internal server error");
  }
}

// Middleware to calculate and set the average rating before saving a Beer document
beerSchema.pre('save', async function (next) {
  this.rating = await calculateAverageRating(this._id);
  next();
});


//Function to fetch all beer from the database
beerSchema.statics.fetchAllBeers = async function () {
  try {
    // Fetch data from MongoDB using your data retrieval logic
    const data = await this.find();

    // Return the fetched data
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
    throw new Error("Internal server error");
  }
};

module.exports = mongoose.model("Beer", beerSchema, "beers");
