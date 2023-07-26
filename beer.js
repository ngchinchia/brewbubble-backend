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

beerSchema.methods.calculateAverageRating = async function () {
  try {
    // Fetch all reviews for this beer
    const reviews = await mongoose.model("Review").find({ beer: this._id });

    // Calculate the total rating and number of reviews
    let totalRating = 0;
    let reviewCount = reviews.length;

    for (const review of reviews) {
      totalRating += review.rating;
    }

    // Calculate the average rating (rounded to 2 decimal places)
    const averageRating = reviewCount > 0 ? parseFloat((totalRating / reviewCount).toFixed(2)) : 0;

    // Update the beer's rating field
    this.rating = averageRating;

    // Save the updated beer document
    await this.save();

    return this;
  } catch (error) {
    console.log("Error calculating average rating:", error);
    throw new Error("Internal server error");
  }
};





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
