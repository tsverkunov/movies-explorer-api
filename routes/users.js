const router = require('express').Router()
const {celebrate, Joi} = require("celebrate");
const { getProfile, updateProfile } = require("../controllers/users");

router.get('/me', getProfile);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().min(2).max(30).required(),
      name: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateProfile,
);

module.exports = router
