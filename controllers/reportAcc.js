const jwt = require('jsonwebtoken');
const ReportAcc = require('../reportAcc');
const mongoose = require('mongoose');


exports.handleReport = async (req, res) => {
  // Reported user
  const { userId, reportedReason } = req.body;

  try {
    // Check if the report already exists for the userId
    const existingReport = await ReportAcc.findOne({ userID: userId });

    if (existingReport) {
      // Report already exists for the userId
      return res.status(400).json({
        success: false,
        message: 'User already banned or has a pending report',
      });
    }

    const reportAccount = new ReportAcc({
      userID: userId,
      adminID: null,
      reason: reportedReason,
      accStatus: "Flagged",
    });


    // Save the new item to the beer
    await reportAccount.save();
    res.status(201).json({
      success: true,
      message: "User reported successfully",
      userId,
    });
  } catch (error) {
    console.log("Error reporting:", error);
    res.status(500).json({
      success: false,
      message: "User to report user",
      error: error.message,
    });
  }
};


// for admin
exports.banAccount = async (req, res) => {
  // Get the passed values
  const userId = req.params.id;
  const { adminId } = req.body;

  try {
    const bannedUser = await ReportAcc.findOneAndUpdate(
      { userID: userId },
      { $set: { accStatus: "Banned", adminID: adminId } },
      { new: true }
    );

    if (!bannedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User banned successfully",
      bannedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to ban user",
      error: error.message,
    });
  }
};


module.exports = exports;


