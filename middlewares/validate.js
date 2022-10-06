const { celebrate, Joi } = require('celebrate');

const validator = require('validator');

const signupValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const signinValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const updateUserValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const creatMovieValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, halpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return halpers.message('Поле image должно быть Url');
    }),
    trailerLink: Joi.string().required().custom((value, halpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return halpers.message('Поле trailerLink должно быть Url');
    }),
    thumbnail: Joi.string().required().custom((value, halpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return halpers.message('Поле thumbnail должно быть Url');
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidate = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

module.exports = {
  signupValidate, signinValidate, updateUserValidate, creatMovieValidate, deleteMovieValidate,
};
