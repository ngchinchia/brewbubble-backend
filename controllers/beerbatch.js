const BeerBatch = require("../beerbatch");

const getDetailsByBeerName = async (req, res) => {
  const beerName = req.query.name;

  try {
    const beerBatches = await BeerBatch.aggregate([
      { $match: { Beer: beerName, "Kegs Full": { $ne: 0 } } }
    ]);

    res.json(beerBatches);
  } catch (error) {
    console.log("Error fetching beer batches:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllBeerBatches = async (req, res) => {
  try {
    const startDate = new Date("2023-01-01T00:00:00Z");
    const endDate = new Date("2024-01-01T00:00:00Z");

    const beerBatches = await BeerBatch.find(
      {
        "Date Created": { $gte: startDate, $lte: endDate },
        "Kegs Full": { $ne: 0 },
      }).sort({ "Kegs Full": -1 });
      

    res.json(beerBatches);
  } catch (error) {
    console.error("Error fetching beer batches:", error);
    throw error;
  }
};

  
  
const addTrackerIDsToBeerBatch = async (req, res) => {
    const { _id, trackerIDs } = req.body;
  
    try {
      const beerBatch = await BeerBatch.findById(_id);
  
      if (beerBatch) {
        beerBatch["Tracker ID"].push(...trackerIDs);
        await beerBatch.save();
  
        res.json({ message: "Tracker IDs added to the beer batch." });
      } else {
        res.status(404).json({ error: "Beer batch not found." });
      }
    } catch (error) {
      console.log("Error adding tracker IDs to beer batch:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  
  
  
  
  
  

module.exports = { getDetailsByBeerName, getAllBeerBatches, addTrackerIDsToBeerBatch };

