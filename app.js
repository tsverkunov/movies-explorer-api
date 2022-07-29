require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const { errors } = require('celebrate');
const { centralErrorProcessing } = require('./middlewares/centralErrorProcessing');
const { auth } = require('./middlewares/auth');
const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(cors)

app.use(requestLogger);
app.use(limiter)
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/diplomdb')
  // eslint-disable-next-line no-console
  .then(() => console.log(`mongoose connected`))
  // eslint-disable-next-line no-console
  .catch((e) => console.log(e));

app.use('/signup', require('./routes/signup'));
app.use('/signin', require('./routes/signin'));


app.use(auth);

app.use('/signout', require('./routes/signout'));
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use(errorLogger);

app.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errors());

app.use(centralErrorProcessing);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
