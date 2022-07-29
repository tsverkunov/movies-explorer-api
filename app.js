require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const { errors } = require('celebrate');
const { centralErrorProcessing } = require('./middlewares/centralErrorProcessing');
const NotFoundError = require('./errors/NotFoundError');
const { auth } = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

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

app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errors());

app.use(centralErrorProcessing);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
