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
    type: String,
    validate: urlValidation,
    required: true,
  },
  trailerLink: {
    type: String,
    validate: urlValidation,
    required: true,
  },
  thumbnail: {
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
