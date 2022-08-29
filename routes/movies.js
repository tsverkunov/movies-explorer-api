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
      created_at: Joi.string().required(),
      updated_at: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.object().keys({
        alternativeText: Joi.string().allow(''),
        caption: Joi.string().allow(''),
        created_at: Joi.string().required(),
        ext: Joi.string().required(),
        formats: Joi.object().keys({
          thumbnail: Joi.object().keys({
            ext: Joi.string().required(),
            hash: Joi.string().required(),
            height: Joi.number().required(),
            mime: Joi.string().required(),
            path: Joi.allow(null, ''),
            size: Joi.number().required(),
            url: Joi.string().required(),
            width: Joi.number().required(),
          }),
          small: Joi.object().keys({
            ext: Joi.string().required(),
            hash: Joi.string().required(),
            height: Joi.number().required(),
            mime: Joi.string().required(),
            path: Joi.allow(null, ''),
            size: Joi.number().required(),
            url: Joi.string().required(),
            width: Joi.number().required(),
          }),
        }),
        hash: Joi.string().required(),
        height: Joi.number().required(),
        id: Joi.number().required(),
        mime: Joi.string().required(),
        name: Joi.string().required(),
        previewUrl: Joi.string().allow(null, ''),
        provider: Joi.string().required(),
        provider_metadata: Joi.string().allow(null, ''),
        size: Joi.number().required(),
        updated_at: Joi.string().required(),
        url: Joi.string().required(),
        width: Joi.number().required(),
      }),
      trailerLink: Joi.string().required().custom(urlValidation),
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
