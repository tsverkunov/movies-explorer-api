const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getProfile, updateProfile } = require('../controllers/users');

router.get('/users/me', getProfile);

router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi
        .string()
        .min(2)
        .max(30)
        .required()
        .email(),
      name: Joi
        .string()
        .min(2)
        .max(30)
        .required(),
    }),
  }),
  updateProfile,
);

module.exports = router;
