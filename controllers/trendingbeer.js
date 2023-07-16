const Beer = require('../trendingbeer');

// Controller action to fetch all beers
exports.getAllBeers = async (req, res) => {
    try {
      const beers = await Beer.find();
      const formattedBeers = beers.map((beer) => {
        return {
         _id: beer._id,
          id: beer.id,
          name: beer.name,
          tagline: beer.tagline,
          first_brewed: beer.first_brewed,
          description: beer.description,
          image_url: beer.image_url,
          abv: beer.abv,
          ibu: beer.ibu,
          target_fg: beer.target_fg,
          target_og: beer.target_og,
          ebc: beer.ebc,
          srm: beer.srm,
          ph: beer.ph,
          attenuation_level: beer.attenuation_level,
          volume: beer.volume,
          boil_volume: beer.boil_volume,
          method: beer.method,
          ingredients: beer.ingredients,
          food_pairing: beer.food_pairing,
          brewers_tips: beer.brewers_tips,
          contributed_by: beer.contributed_by,
          style: beer.style,
          category: beer.category
        };
      });
      res.status(200).json(formattedBeers);
    } catch (error) {
      console.error('Error fetching beers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

// Controller action to create a new beer
exports.createBeer = async (req, res) => {
  try {
    const beerData = req.body; // Assuming the request body contains the beer data
    const beer = new Beer(beerData);
    const savedBeer = await beer.save();
    res.status(201).json(savedBeer);
  } catch (error) {
    console.error('Error creating beer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller action to get a single beer by ID
exports.getBeerById = async (req, res) => {
  try {
    const beerId = req.params.id; // Assuming the beer ID is passed as a route parameter
    const beer = await Beer.findById(beerId);
    
    if (!beer) {
      res.status(404).json({ error: 'Beer not found' });
    } else {
      res.status(200).json(beer);
    }
  } catch (error) {
    console.error('Error fetching beer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller action to update a beer by ID
exports.updateBeer = async (req, res) => {
  try {
    const beerId = req.params.id; // Assuming the beer ID is passed as a route parameter
    const beerData = req.body; // Assuming the request body contains the updated beer data
    
    const updatedBeer = await Beer.findByIdAndUpdate(beerId, beerData, { new: true });
    
    if (!updatedBeer) {
      res.status(404).json({ error: 'Beer not found' });
    } else {
      res.status(200).json(updatedBeer);
    }
  } catch (error) {
    console.error('Error updating beer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller action to delete a beer by ID
exports.deleteBeer = async (req, res) => {
  try {
    const beerId = req.params.id; // Assuming the beer ID is passed as a route parameter
    
    const deletedBeer = await Beer.findByIdAndDelete(beerId);
    
    if (!deletedBeer) {
      res.status(404).json({ error: 'Beer not found' });
    } else {
      res.status(200).json({ message: 'Beer deleted successfully' });
    }
  } catch (error) {
    console.error('Error deleting beer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller action to fetch random 20 beers
exports.getRandomBeers = async (req, res) => {
  try {
    const beers = await Beer.aggregate([{ $sample: { size: 20 } }]);
    const formattedBeers = beers.map((beer) => {
      return {
        _id: beer._id,
        id: beer.id,
        name: beer.name,
        tagline: beer.tagline,
        first_brewed: beer.first_brewed,
        description: beer.description,
        image_url: beer.image_url,
        abv: beer.abv,
        ibu: beer.ibu,
        target_fg: beer.target_fg,
        target_og: beer.target_og,
        ebc: beer.ebc,
        srm: beer.srm,
        ph: beer.ph,
        attenuation_level: beer.attenuation_level,
        volume: beer.volume,
        boil_volume: beer.boil_volume,
        method: beer.method,
        ingredients: beer.ingredients,
        food_pairing: beer.food_pairing,
        brewers_tips: beer.brewers_tips,
        contributed_by: beer.contributed_by,
        style: beer.style
      };
    });
    res.status(200).json(formattedBeers);
  } catch (error) {
    console.error('Error fetching random beers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getFirstBeers = async (req, res) => {
  try {
    const beers = await Beer.find().limit(15);
    const formattedBeers = beers.map((beer) => {
      return {
        _id: beer._id,
        id: beer.id,
        name: beer.name,
        tagline: beer.tagline,
        first_brewed: beer.first_brewed,
        description: beer.description,
        image_url: beer.image_url,
        abv: beer.abv,
        ibu: beer.ibu,
        target_fg: beer.target_fg,
        target_og: beer.target_og,
        ebc: beer.ebc,
        srm: beer.srm,
        ph: beer.ph,
        attenuation_level: beer.attenuation_level,
        volume: beer.volume,
        boil_volume: beer.boil_volume,
        method: beer.method,
        ingredients: beer.ingredients,
        food_pairing: beer.food_pairing,
        brewers_tips: beer.brewers_tips,
        contributed_by: beer.contributed_by,
        style: beer.style,
      };
    });
    res.status(200).json(formattedBeers);
  } catch (error) {
    console.error('Error fetching first beers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getAllTaglines = async (req, res) => {
  try {
    const beers = await Beer.find();
    const taglines = beers.map((beer) => beer.tagline);
    res.status(200).json(taglines);
  } catch (error) {
    console.error('Error fetching taglines:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllBeerStyles = async (req, res) => {
  try {
    const beers = await Beer.find();
    
    const beerStylesSet = new Set(beers.map((beer) => beer.style));
    const beerStyles = Array.from(beerStylesSet);
    
    res.status(200).json(beerStyles);
  } catch (error) {
    console.error('Error fetching beer styles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getAllMaltNames = async (req, res) => {
  try {
    const beers = await Beer.find({}, 'ingredients.malt.name');
    const maltNames = beers.reduce((names, beer) => {
      beer.ingredients.malt.forEach((malt) => {
        names.add(malt.name);
      });
      return names;
    }, new Set());
    res.status(200).json(Array.from(maltNames));
  } catch (error) {
    console.error('Error fetching malt names:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const keywordMappings = require('../keywordmapping');
exports.categorizeBeersByKeywords = async (req, res) => {
  try {
    // Fetch all beers from the database with only the 'description' field
    const beers = await Beer.find({}, 'description');


    function categorizeBeersByKeywords(beers, keywordMappings) {
      // Categorize beers based on keywords
      beers.forEach((beer) => {
        const description = beer.description.toLowerCase();
        let styleFound = false;

        // Check if any keyword is present in the description for any beer style
        Object.keys(keywordMappings).forEach((style) => {
          const foundKeywords = keywordMappings[style].filter((keyword) =>
            description.includes(keyword)
          );

          if (foundKeywords.length > 0) {
            // If any keyword is found, assign the beer style and break the loop
            beer.style = style;
            styleFound = true;
            return;
          }
        });

        if (!styleFound) {
          // If no style is found, you can assign a default style or handle it as per your requirements
          beer.style = 'Unknown';
        }

        // Save the updated beer document
        beer.save();
      });
    }

    // Call the categorizeBeersByKeywords method passing the fetched beer descriptions and keyword mappings
    categorizeBeersByKeywords(beers, keywordMappings);

    res.status(200).json({ message: 'Beer styles updated successfully.' });
  } catch (error) {
    console.error('Error categorizing beers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};








module.exports = exports;