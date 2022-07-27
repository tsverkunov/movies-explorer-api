const bcrypt = require('bcryptjs')
const User = require('../models/user')

const {MONGO_DUPLICATE_ERROR_CODE} = require("../utils/constants");

const DataError = require('../errors/DataError')
const DuplicateError = require("../errors/DuplicateError");

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body

  if (!email || !password) {
    throw new DataError('Не введен email или пароль.')
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
        name,
        email,
        password: hash
      })
    )
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email
      })
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new DataError('Пользователь с указанным _id не найден.'));
      }
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        return next(new DuplicateError('Email занят'));
      }
      return next(err);
    })
}
