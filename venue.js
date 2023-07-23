const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  venueName: {
    type: String,
    required: true,
  },
  venueRating: {
    type: Number,
  },
  venueAddr: {
    type: String,
  },
  venueOperatingHrs: {
    type: String,
  },
  venueSocials: {
    type: String,
  },
  brewerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  venueImage: {
    type: String,
  },
  promotionID: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Promotion',
  }],
  beerID: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'beer',
  }],
});

// Function to fetch all wish list items from the database
venueSchema.statics.fetchAllVenues = async function () {
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


module.exports = mongoose.model("Venue", venueSchema, "venue");
