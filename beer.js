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
  }
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
