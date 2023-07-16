const mongoose = require("mongoose");

const beerbatchSchema = new mongoose.Schema({
  Place: {
    type: String,
    ref: "PlacesListSample",
    required: false,
  },
  Beer: {
    type: String,
    required: true,
  },
  "Kegs Full": 
     {
        type: Number,
        required: true,
      },
     
  "Kegs Emptied": {
    type: Number,
    required: true,
  },
  "Date Created": {
    type: Date,
    required: true,
  },
  "Tracker ID": [
    {
      type: String,
      required: true,
    },
  ],
 
},
{ collection: "BeerBatch" } 
);

module.exports = mongoose.model("Beerbatch", beerbatchSchema);
