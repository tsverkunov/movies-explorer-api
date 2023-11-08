require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');

const { centralErrorProcessing } = require('./middlewares/centralErrorProcessing');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/limiter');
const { allowedCors } = require('./utils/corsAllowedCors');

const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000, LINK_MONGO, NODE_ENV } = process.env;

const app = express();

app.use(requestLogger);

app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

mongoose.connect(NODE_ENV === 'production' ? LINK_MONGO : 'mongodb://mongo:27017/db')
  .then(() => console.log('mongoose connected'))
  .catch((e) => console.log(e));

app.use(router);

app.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

app.use(errorLogger);
app.use(errors());
app.use(centralErrorProcessing);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
