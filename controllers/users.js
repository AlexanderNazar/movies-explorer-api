const User = require('../models/user');

const BadRequestError = require('../Errors/BadRequestError');
const NotFoundError = require('../Errors/NotFoundError');

const getUserInfo = (req, res, next) => {
  const { _id } = req.user;
  // То-ли id, то-ли _id
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
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Введены некорректные данные: ${err.message}`));
      } else next(err);
    });
};

const createUser = () => {

};

const login = () => {

};

const lognout = (req, res) => {
  try {
    res.clearCookie('jwtForAutorization');
  } catch (err) {
  // Выбрать ошибку
    throw new Error('Невозможно удалить cookie');
  }

  res.send({ message: 'cookie удалены' });
};

module.exports = {
  getUserInfo, updateUserInfo, createUser, login, lognout,
};
