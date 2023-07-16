const jwt = require('jsonwebtoken');
const Brewery = require("../brewery");

exports.handleSearch = async (req, res) => {
  const searchQuery = req.query.search;

  try {
    const searchResults = await Brewery.find({
      BreweryName: { $regex: searchQuery, $options: 'i' }
    });

    res.json(searchResults);
  } catch (error) {
    console.log('Error searching Brewerys:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search Brewerys',
      error: error.message,
    });
  }
};

exports.getAllBrewerys = async (req, res) => {
  try {
    const Brewerys = await Brewery.find();
    res.json(Brewerys);
  } catch (error) {
    console.log('Error fetching Brewerys:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Brewerys',
      error: error.message,
    });
  }
};


exports.handleAddBrewery = async (req, res) => {
  // Get the passed values
  const {
    BreweryName,
    BreweryRating,
    BreweryAddr,
    BreweryOperatingHrs,
    BrewerySocials,
    brewerID,
  } = req.body;

  try {
    const newBrewery = new Brewery({
      BreweryName,
      BreweryRating,
      BreweryAddr,
      BreweryOperatingHrs,
      BrewerySocials,
      brewerID,
    });

    // Save the new brewery to the database
    await newBrewery.save();

    res.status(201).json({
      success: true,
      message: 'Brewery added successfully',
      brewery: newBrewery,
    });
  } catch (error) {
    console.log('Error adding brewery:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add brewery',
      error: error.message,
    });
  }
};


exports.deleteBrewery = async (req, res) => {
  const BreweryID = req.params.id; // Use req.params.id to retrieve the beer ID

  try {
    const deletedBrewery = await Brewery.findByIdAndDelete(BreweryID);
    if (!deletedBrewery) {
      return res.status(404).json({
        success: false,
        message: "Brewery not found",
      });
    }
    res.json({
      success: true,
      message: "Brewery deleted successfully",
      Brewery: deletedBrewery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete beer",
      error: error.message,
    });
  }
};

exports.updateBrewery = async (req, res) => {
  const BreweryId = req.params.id;
  const {
    BreweryName,
    BreweryAddr,
    BreweryOperatingHrs,
    BrewerySocials,
  } = req.body;

  try {
    const updatedBrewery = await Brewery.findByIdAndUpdate(
      BreweryId,
      {
        BreweryName,
        BreweryAddr,
        BreweryOperatingHrs,
        BrewerySocials,
      },
      { new: true }
    );

    if (!updatedBrewery) {
      return res.status(404).json({
        success: false,
        message: "Brewery not found",
      });
    }

    res.json({
      success: true,
      message: "Brewery updated successfully",
      Brewery: updatedBrewery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update Brewery",
      error: error.message,
    });
  }
};






exports.AddBeerToBrewery = async (req, res) => {
  const BreweryID = req.params.id;
  const { beerID } = req.body;

  try {
    const updatedBrewery = await Brewery.findOneAndUpdate(
      { _id: BreweryID },
      { $addToSet: { beerID: { $each: beerID } } },
      { safe: true, upsert: true }
    );

    if (!updatedBrewery) {
      return res.status(404).json({
        success: false,
        message: "Brewery not found",
      });
    }

    res.json({
      success: true,
      message: "Beer added successfully",
      Brewery: updatedBrewery,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add beer",
      error: error.message,
    });
  }
};

module.exports = exports;


