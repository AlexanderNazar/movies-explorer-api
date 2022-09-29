const router = require('express').Router();

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

router.use('/users/me', usersRoutes);

router.use('/movies', moviesRoutes);

module.exports = router;
