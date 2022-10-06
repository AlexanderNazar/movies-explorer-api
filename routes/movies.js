const router = require('express').Router();

const { creatMovieValidate, deleteMovieValidate } = require('../middlewares/validate');

const {
  getAllSavedMovies, creatMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/', getAllSavedMovies);

router.post('/', creatMovieValidate, creatMovie);

router.delete('/:_id', deleteMovieValidate, deleteMovie);

module.exports = router;
