const mongoose = require("mongoose");
const Beer = require("./beer");

const wishListSchema = new mongoose.Schema({
  listType: {
    type: String,
    required: true,
  },

  beerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Beer',
  },
  venueID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue',
    default: null,
  },
  breweryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brewery',
    default: null,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Function to fetch all wish list items from the database
wishListSchema.statics.fetchAllWishListItems = async function () {
  try {
    // Fetch wish list items from MongoDB using your data retrieval logic
    const data = await this.find().populate('beerID');

    const wishListItems = data.map(({ _id, listType, beerID, venueID }) => ({
      _id,
      listType,
      beerID,
      beerName: beerID.beerName, // Assuming the beer document has a 'beerName' field
      venueID,
    }));

    // Return the fetched data with beerName included
    return wishListItems;

  } catch (error) {
    console.log("Error fetching wish list data:", error);
    throw new Error("Internal server error");
  }
};





module.exports = mongoose.model("wishList", wishListSchema);
