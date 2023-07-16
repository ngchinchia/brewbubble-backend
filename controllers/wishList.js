const jwt = require("jsonwebtoken");
const wishList = require("../wishList");

exports.addToList = async (req, res) => {
  const { listType, beerID, venueID } = req.body; // Assuming the data is sent in the request body
  const userID = req.user.id;

  try {
    const duplicateCheck = await wishList.findOne({ listType, beerID, userID });

    if (duplicateCheck) {
      return res
        .status(400)
        .json({ error: "Item already added in wish list!" });
    }
    const newItem = new wishList({
      listType,
      beerID,
      venueID,
      userID,
    });

    // Save the new item to the wish list
    const savedItem = await newItem.save();
    console.log("added to wish list");
    res.status(201).json(savedItem);
  } catch (error) {
    console.log("Unable to add to wish list:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteFromList = async (req, res) => {
  const { listType, beerID } = req.body; // Assuming the data is sent in the request body
  const userID = req.user.id;

  try {

    const deleteItem = await wishList.findOneAndDelete({
      listType,
      beerID,
      userID,
    });

    

    if (!deleteItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found in wish list",
      });
    }

    res.json({
      success: true,
      message: "Item deleted successfully",
      item: deleteItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete item from wish list",
      error: error.message,
    });
  }
};

exports.getWishlist = async (req, res) => {
  const userId = req.params.userId;

  try {
    const wishlistItems = await wishList.find({ userID: userId });
    res.json(wishlistItems);
  } catch (error) {
    console.log("Error fetching wishlist items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = exports;
