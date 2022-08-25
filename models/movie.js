const mongoose = require('mongoose');
const { urlValidation } = require('../utils/urlValidator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
  updated_at: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    alternativeText: String,
    caption: String,
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    formats: {
      thumbnail: {
        hash: {
          type: String,
          required: true,
        },
        ext: {
          type: String,
          required: true,
        },
        mime: {
          type: String,
          required: true,
        },
        width: {
          type: Number,
          required: true,
        },
        height: {
          type: Number,
          required: true,
        },
        size: {
          type: Number,
          required: true,
        },
        path: {
          type: String,
          default: null,
        },
        url: {
          type: String,
          required: true,
        },
      },
      small: {
        hash: {
          type: String,
          required: true,
        },
        ext: {
          type: String,
          required: true,
        },
        mime: {
          type: String,
          required: true,
        },
        width: {
          type: Number,
          required: true,
        },
        height: {
          type: Number,
          required: true,
        },
        size: {
          type: Number,
          required: true,
        },
        path: {
          type: String,
          default: null,
        },
        url: {
          type: String,
          required: true,
        },
      }
    },
    hash: {
      type: String,
      required: true,
    },
    ext: String,
    mime: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    previewUrl: {
      type: String,
      default: null,
    },
    provider: {
      type: String,
      required: true,
    },
    provider_metadata: {
      type: String,
      default: null,
    },
    created_at: {
      type: String,
      required: true,
    },
    updated_at: {
      type: String,
      required: true,
    },
  },
  trailerLink: {
    type: String,
    validate: urlValidation,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
