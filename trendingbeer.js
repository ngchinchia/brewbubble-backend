const mongoose = require('mongoose');

const trendingbeerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  first_brewed: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  abv: {
    type: Number,
    required: true,
  },
  ibu: {
    type: Number,
    required: true,
  },
  target_fg: {
    type: Number,
    required: true,
  },
  target_og: {
    type: Number,
    required: true,
  },
  ebc: {
    type: Number,
    required: true,
  },
  srm: {
    type: Number,
    required: true,
  },
  ph: {
    type: Number,
    required: true,
  },
  attenuation_level: {
    type: Number,
    required: true,
  },
  volume: {
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  boil_volume: {
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  method: {
    mash_temp: [
      {
        temp: {
          value: {
            type: Number,
            required: true,
          },
          unit: {
            type: String,
            required: true,
          },
        },
        duration: {
          type: Number,
          required: true,
        },
      },
    ],
    fermentation: {
      temp: {
        value: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
      },
    },
    twist: {
      type: String,
      default: null,
    },
  },
  ingredients: {
    malt: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          value: {
            type: Number,
            required: true,
          },
          unit: {
            type: String,
            required: true,
          },
        },
      },
    ],
    hops: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          value: {
            type: Number,
            required: true,
          },
          unit: {
            type: String,
            required: true,
          },
        },
        add: {
          type: String,
          required: true,
        },
        attribute: {
          type: String,
          required: true,
        },
      },
    ],
    yeast: {
      type: String,
      required: true,
    },
  },
  food_pairing: {
    type: [String],
    required: true,
  },
  brewers_tips: {
    type: String,
    required: true,
  },
  contributed_by: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('TrendBeer', trendingbeerSchema,'allbeers');
