const jwt = require('jsonwebtoken');
const beer = require("../beer");


exports.handleAddBeer = async (req, res) => {
  // Get the passed values 
  const {
    beerName,
    beerAlcoholPercentage,
    beerDesc,
    beerStyle,
    beerImage,
    brewerID } = req.body;

  try {
    const addBeer = new beer({
      beerName,
      beerAlcoholPercentage,
      beerDesc,
      beerStyle,
      beerImage,
      brewerID,
    });

    // Save the new item to the beer
    await addBeer.save();
    res.status(201).json({
      success: true,
      message: "Beer added successfully",
      beerName,
    });
  } catch (error) {
    console.log("Error adding beer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add beer",
      error: error.message,
    });
  }
};


exports.deleteBeer = async (req, res) => {
  const beerID = req.params.id; // Use req.params.id to retrieve the beer ID

  try {
    const deletedBeer = await beer.findByIdAndDelete(beerID);
    if (!deletedBeer) {
      return res.status(404).json({
        success: false,
        message: "Beer not found",
      });
    }
    res.json({
      success: true,
      message: "Beer deleted successfully",
      beer: deletedBeer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete beer",
      error: error.message,
    });
  }
};

exports.updateBeer = async (req, res) => {
  const beerId = req.params.id;
  const {
    beerName,
    beerAlcoholPercentage,
    beerDesc,
    beerStyle,
    beerImage,
  } = req.body;

  try {
    const updatedBeer = await beer.findByIdAndUpdate(
      beerId,
      {
        beerName,
        beerAlcoholPercentage,
        beerDesc,
        beerStyle,
        beerImage,
      },
      { new: true }
    );

    if (!updatedBeer) {
      return res.status(404).json({
        success: false,
        message: "Beer not found",
      });
    }

    res.json({
      success: true,
      message: "Beer updated successfully",
      beer: updatedBeer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update beer",
      error: error.message,
    });
  }
};

exports.retrieveAllBeers = async (req, res) => {
  try {
    // Call the fetchAllBeers method on the Beer model
    const beers = await beer.fetchAllBeers();

    // Send the fetched beers as a response
    res.json(beers);
  } catch (error) {
    // Handle any errors that occur during the data fetching process
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.retrieveBeersByID = async (req, res) => {
  try {
    const { userId } = req.params;

    // Call the fetchAllBeersByUserId method on the Beer model
    const beers = await beer.fetchAllBeersByUserId(userId);

    // Send the fetched beers as a response
    res.json(beers);
  } catch (error) {
    // Handle any errors that occur during the data fetching process
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = exports;


