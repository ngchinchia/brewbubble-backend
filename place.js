const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  "Place Type": {
    type: String,
    required: true,
  },
 " Keg Count": {
    type: Number,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  Postcode: {
    type: Number,
    required: true,
  },
  Country: {
    type: String,
    required: true,
  },
},
{ collection: "PlacesListSample" } 
);

module.exports = mongoose.model("Place", placeSchema);
