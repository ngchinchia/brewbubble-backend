const BeerList = require("../beerlist");

const getAllBeerListData = async (req, res) => {
  try {
    const beerListData = await BeerList.find();
    res.status(200).json(beerListData);
  } catch (error) {
    console.error("Error retrieving BeerList data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAllBeerListData };
