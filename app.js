const express = require('express');

require('dotenv').config();

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const helmet = require('helmet');

const { NODE_ENV, DB_ADRESS } = process.env;

const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');

const limiter = require('./middlewares/rateLimiter');

const cors = require('./middlewares/cors');

const handleError = require('./middlewares/handleError');

const NotFoundError = require('./Errors/NotFoundError');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const routes = require('./routes/index');

const app = express();

const addressDB = NODE_ENV === 'production' ? DB_ADRESS : 'mongodb://localhost:27017/moviesdb';

mongoose.connect(addressDB, {
  useNewUrlParser: true,
});

app.use(cors);

app.use(helmet());

app.use(requestLogger);

app.use(limiter);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(routes);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

app.use(handleError);

app.listen(PORT);
