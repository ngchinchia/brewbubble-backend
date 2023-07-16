const Place = require("../place"); // Assuming the schema is defined in a separate file

const fetchAllPlaces = async (req, res) => {
    try {
        const PlaceData = await Place.find();
        res.status(200).json(PlaceData);
      } catch (error) {
        console.error("Error retrieving Place data:", error);
        res.status(500).json({ error: "Internal server error" });
      }
};

const fetchPlacesByName = async (req, res) => {
    const placeName = req.params.name;
  
    try {
      const placeData = await Place.findOne({ Name: placeName });
  
      if (!placeData) {
        return res.status(404).json({ error: "Place not found" });
      }
  
      res.status(200).json(placeData);
    } catch (error) {
      console.error("Error retrieving place data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  

  

module.exports = { fetchAllPlaces, fetchPlacesByName };
