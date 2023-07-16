const mongoose = require("mongoose");

const promotionSchema = new mongoose.Schema({
  promotionName: {
    type: String,
    required: true,
  },
  promotionDescription: {
    type: String,
  },
  brewerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

promotionSchema.statics.fetchAllPromotion = async function () {
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

module.exports = mongoose.model("promotion", promotionSchema, "promotions");
