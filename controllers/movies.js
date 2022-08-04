const Movie = require('../models/movie');

const DataError = require('../errors/DataError');
const NotFoundError = require('../errors/NotFoundError');
const OwnerError = require('../errors/OwnerError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      if (!movies) {
        throw new DataError('Фильмы не получены.');
      }
      res.send({ movies });
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  console.log(req.user);
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const owner = req.user._id;

  Movie.create(
    {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    },
  )
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new DataError('Переданы некорректные данные при создании фильма.'));
      }

      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найдена.');
      }
      if (String(movie.owner) !== String(req.user._id)) {
        throw new OwnerError('Вы не можете удалить чужой фильм.');
      }
    })
    .then(() => {
      Movie.findByIdAndRemove(req.params.movieId)
        .then((movie) => {
          if (!movie) {
            throw new NotFoundError('Фильм с указанным _id не найден.');
          }
          return res.send({ movie });
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new DataError('Фильм с указанным _id не найден.'));
          }
          return next(err);
        });
    })
    .catch(next);
};
