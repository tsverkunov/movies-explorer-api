// const router = require('express').Router()
// const {celebrate, Joi} = require("celebrate");
// const {createUser} = require("../controllers/users");
// const { urlValidation } = require('../utils/urlValidator');
//
// // router.get('/', getMovies);
//
// router.post(
//   '/me',
//   celebrate({
//     body: Joi.object().keys({
//       country: Joi.string().required(),
//       director: Joi.string().required(),
//       duration: Joi.number().required(),
//       year: Joi.string().required(),
//       description: Joi.string().required(),
//       image: Joi.string().required().custom(urlValidation),
//       trailerLink: Joi.string().required().custom(urlValidation),
//       thumbnail: Joi.string().required().custom(urlValidation),
//       owner: Joi.string().required(),
//       movieId: Joi.string().required(),
//       nameRU: Joi.required(),
//       nameEN: Joi.required(),
//     }),
//   }),
//   updateProfile,
// );
// router.delete(
//   '/:movieId',
//   celebrate({
//     params: Joi.object().keys({
//       cardId: Joi.string().length(24).hex(),
//     }),
//   }),
//   deleteMovie,
// );
//
// module.exports = router