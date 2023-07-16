const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
    "Tracker ID": {
      type: String,
      required: true,
    },
    // Other tracking fields
  });

  module.exports = mongoose.model('Tracking', trackingSchema);