const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const BadRequestError = require('../Errors/BadRequestError');
const NotFoundError = require('../Errors/NotFoundError');
const ConflictError = require('../Errors/ConflictError');

const getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Некорректно передан id пользователя: ${err.message}`));
      } else next(err);
    });
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(
    _id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким Email уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestError(`Введены некорректные данные: ${err.message}`));
      } else next(err);
    });
};

const createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email, password: hash, name,
      })
        .then((user) => res.status(201).send({
          user: {
            name: user.name,
            email: user.email,
            _id: user._id,
          },
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким Email уже существует'));
          } else if (err.name === 'ValidationError') {
            next(new BadRequestError(`Введены некорректные данные: ${err.message}`));
          } else next(err);
        });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwtForAutorization', token, {
        secure: NODE_ENV === 'production',
        maxAge: 604800000,
        httpOnly: true,
        sameSite: false,
      });
      res.send({ message: 'Вход выполнен успешно!' });
    })
    .catch(next);
};

const lognout = (req, res) => {
  try {
    res.clearCookie('jwtForAutorization');
  } catch (err) {
    throw new NotFoundError('Невозможно удалить cookie');
  }
  res.send({ message: 'cookie удалены' });
};

module.exports = {
  getUserInfo, updateUserInfo, createUser, login, lognout,
};
