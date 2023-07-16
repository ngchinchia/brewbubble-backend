const mongoose = require("mongoose");

const beerlistSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  "Target ABV (%)": {
    type: Number,
    required: true,
  },
  "Life Expectancy (days)": {
    type: Number,
    required: true,
  },
  "Temperature (°C)": {
    type: String,
    required: true,
  },
  "Keg Count": {
    type: Number,
    required: true,
  },
  "Date Created": {
    type: Date,
    required: true,
  },
  Active: {
    type: Boolean,
    required: true,
  },
},
{ collection: "BeerListSample" } 
);

module.exports = mongoose.model("BeerList", beerlistSchema);
