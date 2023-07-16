const SmartKeg = require("../smartkeg");

const getFreshness = async (req, res) => {
  try {
    const smartKeg = await SmartKeg.find({ "Freshness (%)": { $ne: 0 } })
      .sort({ "Freshness (%)": -1 })
      .exec();

    res.json(smartKeg);
  } catch (error) {
    console.log(
      "Error fetching smart kegs with freshness more than 0 :",
      error
    );
    res.status(500).json({ error: "Internal server error" });
  }
};

const findByTrackerID = async (req, res) => {
  const trackerID = req.query.trackerID;

  try {
    const smartKeg = await SmartKeg.find({ "Tracker ID": trackerID });

    res.json(smartKeg);
  } catch (error) {
    console.log("Error fetching smart keg by tracking ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllKegs = async (req, res) => {
  try {
    const startOfYear = new Date("2023-01-01");
    const endOfYear = new Date("2023-12-31");

    const smartKegs = await SmartKeg.find({
      Date: { $gte: startOfYear, $lte: endOfYear },
    });

    res.json(smartKegs);
  } catch (error) {
    console.log("Error fetching kegs full details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getFreshness, findByTrackerID, getAllKegs };
