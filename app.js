require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes/index')
const cors = require('cors')

const { centralErrorProcessing } = require('./middlewares/centralErrorProcessing');
// const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');

const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000, LINK_MONGO, NODE_ENV } = process.env;

const app = express();

app.use(requestLogger);

app.use(cors())

app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

mongoose.connect(NODE_ENV === 'production' ? LINK_MONGO : 'mongodb://localhost:27017/devdb')
  .then(() => console.log('mongoose connected'))
  .catch((e) => console.log(e));

app.use(router);

app.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errorLogger);
app.use(errors());
app.use(centralErrorProcessing);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
