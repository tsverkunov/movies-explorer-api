const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { MONGO_DUPLICATE_ERROR_CODE, EMAIL_OR_PASSWORD_ERROR_CODE } = require('../utils/constants');

const DataError = require('../errors/DataError');
const DuplicateError = require('../errors/DuplicateError');
const NotFoundError = require('../errors/NotFoundError');
const EmailOrPasswordError = require('../errors/EmailOfPasswordError');
const { createToken } = require('../utils/jwt');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  if (!email || !password) {
    throw new DataError('Не введен email или пароль.');
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
        name,
        email,
        password: hash,
      }),
    )
    .then((user) => {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new DataError('Пользователь с указанным _id не найден.'));
      }
      if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
        return next(new DuplicateError('Email занят'));
      }
      return next(err);
    });
};

module.exports.getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new DataError('Переданы некорректные данные.'));
      }
      if (err.name === 'CastError') {
        return next(new DataError('Пользователь с указанным _id не найден.'));
      }
      return next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      }
      return res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new DataError('Переданы некорректные данные при обновлении профиля.'));
      }
      if (err.name === 'CastError') {
        return next(new DataError('Пользователь с указанным _id не найден.'));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new EmailOrPasswordError('Неправильная почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new EmailOrPasswordError('Неправильная почта или пароль');
          }
          return user;
        });
    })
    .then((user) => ({
      token: createToken({ _id: user._id }),
    }))
    .then(({ token }) => {
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });

      return res.send({ token });
    })
    .catch((err) => {
      if (err.statusCode === EMAIL_OR_PASSWORD_ERROR_CODE) {
        return next(new EmailOrPasswordError(err.message));
      }
      return next(err);
    });
};