const jwt = require('jsonwebtoken');
const promotion = require("../promotion");


exports.handleAddPromotion = async (req, res) => {
  // Get the passed values 
  const {
    promotionName,
    promotionDescription,
    brewerID } = req.body;

  try {
    const addPromotion = new promotion({
      promotionName,
      promotionDescription,
      brewerID
    });

    // Save the new item to the beer
    await addPromotion.save();
    res.status(201).json({
      success: true,
      message: "Promotion added successfully",
      promotionName,
    });
  } catch (error) {
    console.log("Error adding beer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add promotion",
      error: error.message,
    });
  }
};

exports.handleUpdatePromotion = async (req, res) => {
  const promotionId = req.params.id;
  const {
    promotionName,
    promotionDescription,
  } = req.body;

  try {
    const updatedPromotion = await promotion.findByIdAndUpdate(
      promotionId,
      {
        promotionName,
        promotionDescription,
      },
      { new: true }
    );

    if (!updatedPromotion) {
      return res.status(404).json({
        success: false,
        message: "Promotion not found",
      });
    }

    res.json({
      success: true,
      message: "Promotion updated successfully",
      promotion: updatedPromotion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update promotion",
      error: error.message,
    });
  }
};

exports.deletePromotion = async (req, res) => {
  const promotionID = req.params.id; // Use req.params.id to retrieve the promotion ID

  try {
    const deletedPromotion = await promotion.findByIdAndDelete(promotionID);
    if (!deletedPromotion) {
      return res.status(404).json({
        success: false,
        message: "Promotion not found",
      });
    }
    res.json({
      success: true,
      message: "Promotion deleted successfully",
      venue: deletedPromotion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete promotion",
      error: error.message,
    });
  }
};

module.exports = exports;


