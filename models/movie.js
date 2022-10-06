const { Schema, model } = require('mongoose');

const validator = require('validator');

const movieSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (props) => validator.isURL(props, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: 'Неправильный формат ссылки',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (props) => validator.isURL(props, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: 'Неправильный формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (props) => validator.isURL(props, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = model('movie', movieSchema);
