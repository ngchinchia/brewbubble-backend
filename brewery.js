const mongoose = require("mongoose");

const BrewerySchema = new mongoose.Schema({
  BreweryName: {
    type: String,
    required: true,
  },
  BreweryRating: {
    type: Number,
  },
  BreweryAddr: {
    type: String,
  },
  BreweryOperatingHrs: {
    type: String,
  },
  BrewerySocials: {
    type: String,
  },
  brewerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  promotionID: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Promotion',
  }],
  beerID: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Beer',
  }],
  breweryImage: {
    type: String,
  },
});

// Function to fetch all wish list items from the database
BrewerySchema.statics.fetchAllBreweries = async function () {
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


module.exports = mongoose.model("Brewery", BrewerySchema);
