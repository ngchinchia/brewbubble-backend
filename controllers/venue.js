const jwt = require('jsonwebtoken');
const venue = require("../venue");

exports.handleSearch = async (req, res) => {
  const searchQuery = req.query.search;

  try {
    const searchResults = await venue.find({
      venueName: { $regex: searchQuery, $options: 'i' }
    });

    res.json(searchResults);
  } catch (error) {
    console.log('Error searching venues:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search venues',
      error: error.message,
    });
  }
};

exports.getAllVenues = async (req, res) => {
  try {
    const venues = await venue.find();
    res.json(venues);
  } catch (error) {
    console.log('Error fetching venues:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch venues',
      error: error.message,
    });
  }
};


exports.handleAddVenue = async (req, res) => {
  // Get the passed values 
  const {
    venueName,
    venueRating,
    venueAddr,
    venueOperatingHrs,
    venueSocials,
    brewerID } = req.body;

  try {
    const addVenue = new venue({
      venueName,
      venueRating,
      venueAddr,
      venueOperatingHrs,
      venueSocials,
      brewerID,
    });

    // Save the new item to the beer
    await addVenue.save();
    res.status(201).json({
      success: true,
      message: "Venue added successfully",
      venueName,
    });
  } catch (error) {
    console.log("Error adding Venue:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Venue",
      error: error.message,
    });
  }
};



exports.deleteVenue = async (req, res) => {
  const venueID = req.params.id; // Use req.params.id to retrieve the beer ID

  try {
    const deletedVenue = await venue.findByIdAndDelete(venueID);
    if (!deletedVenue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found",
      });
    }
    res.json({
      success: true,
      message: "Venue deleted successfully",
      venue: deletedVenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete beer",
      error: error.message,
    });
  }
};

exports.updateVenue = async (req, res) => {
  const venueId = req.params.id;
  const {
    venueName,
    venueAddr,
    venueOperatingHrs,
    venueSocials,
  } = req.body;

  try {
    const updatedVenue = await venue.findByIdAndUpdate(
      venueId,
      {
        venueName,
        venueAddr,
        venueOperatingHrs,
        venueSocials,
      },
      { new: true }
    );

    if (!updatedVenue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found",
      });
    }

    res.json({
      success: true,
      message: "Venue updated successfully",
      venue: updatedVenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update venue",
      error: error.message,
    });
  }
};


exports.AddPromotionToVenue = async (req, res) => {
  const venueID = req.params.id;
  const { promotionId } = req.body;

  try {
    const updatedVenue = await venue.findOneAndUpdate(
      { _id: venueID },
      { $addToSet: { promotionID: { $each: promotionId } } },
      { safe: true, upsert: true },
    );

    if (!updatedVenue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found",
      });
    }

    res.json({
      success: true,
      message: "Promotion added successfully",
      venue: updatedVenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add promotion",
      error: error.message,
    })
  }
};


exports.AddBeerToVenue = async (req, res) => {
  const venueID = req.params.id;
  const { beerID } = req.body;

  try {
    const updatedVenue = await venue.findOneAndUpdate(
      { _id: venueID },
      { $addToSet: { beerID: { $each: beerID } } },
      { safe: true, upsert: true }
    );

    if (!updatedVenue) {
      return res.status(404).json({
        success: false,
        message: "Venue not found",
      });
    }

    res.json({
      success: true,
      message: "Beer added successfully",
      venue: updatedVenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add beer",
      error: error.message,
    });
  }
};


exports.deletePromotionFromVenue = async (req, res) => {
  const { id, promotionId } = req.params;

  try {
    const updatedVenue = await venue.findByIdAndUpdate(
      id,
      { $pull: { promotionID: promotionId } },
      { new: true }
    );

    if (!updatedVenue) {
      return res.status(404).json({
        success: false,
        message: "Promotion not found",
      });
    }

    res.json({
      success: true,
      message: "Promotion removed successfully",
      venue: updatedVenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove promotion",
      error: error.message,
    });
  }
};


exports.deleteBeersFromVenue = async (req, res) => {
  const { id, beerId } = req.params;

  try {
    const updatedVenue = await venue.findByIdAndUpdate(
      id,
      { $pull: { beerID: beerId } },
      { new: true }
    );

    if (!updatedVenue) {
      return res.status(404).json({
        success: false,
        message: "Beer not found",
      });
    }

    res.json({
      success: true,
      message: "Beer removed successfully",
      venue: updatedVenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove beer",
      error: error.message,
    });
  }
};


module.exports = exports;


