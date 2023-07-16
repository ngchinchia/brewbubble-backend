const mongoose = require("mongoose");

const smartKegSchema = new mongoose.Schema(
  {
    Date: {
      type: Date,
      required: true,
    },
    "Local Date": {
      type: String,
      required: true,
    },
    "Local Time": {
      type: String,
      required: true,
    },

    "Tracker ID": {
      type: String,
      required: true,
    },
    "Temperature (°C)": {
      type: Number,
      required: true,
    },
    Orientation: {
      type: String,
      required: true,
    },
    " Freshness (%)": {
      type: Number,
      required: true,
    },
    Moved: {
      type: Boolean,
      required: true,
    },
    Latitude: {
      type: Number,
      required: true,
    },
    Longitude: {
      type: Number,
      required: true,
    },

    "Location Accuracy (m)": {
      type: Number,
      required: true,
    },
  },
  { collection: "SmartKegSample" } // Specify the existing collection name here
);

module.exports = mongoose.model("SmartKeg", smartKegSchema);
