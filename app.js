require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { centralErrorProcessing } = require('./middlewares/centralErrorProcessing');
const { auth } = require('./middlewares/auth');
const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000, LINK_MONGO, NODE_ENV } = process.env;

const app = express();

app.use(cors);

app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(NODE_ENV === 'production' ? LINK_MONGO : 'mongodb://localhost:27017/devdb')
  .then(() => console.log('mongoose connected'))
  .catch((e) => console.log(e));

app.use(require('./routes/signup'));

app.use(auth);

app.use(require('./routes/signout'));
app.use(require('./routes/users'));
app.use(require('./routes/movies'));

app.use(errorLogger);

app.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errors());

app.use(centralErrorProcessing);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
