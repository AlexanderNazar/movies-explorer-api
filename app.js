require('dotenv').config();

const { PORT = 3000 } = process.env;

const mongoose = require('mongoose');

const express = require('express');

const cookieParser = require('cookie-parser');

const { celebrate, Joi, errors } = require('celebrate');

const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/users');

const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users/me', usersRoutes);
app.use('/movies', moviesRoutes);

app.use(errors());

app.listen(PORT);
