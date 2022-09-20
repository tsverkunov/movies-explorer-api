const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlValidation } = require('../utils/urlValidator');
const { getMovies, deleteMovie, createMovie } = require('../controllers/movies');

router.get('/movies/', getMovies);

router.post(
  '/movies/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom(urlValidation),
      trailerLink: Joi.string().required().custom(urlValidation),
      thumbnail: Joi.string().required().custom(urlValidation),
      id: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

router.delete(
  '/movies/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
