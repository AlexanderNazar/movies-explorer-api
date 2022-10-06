const router = require('express').Router();

const auth = require('../middlewares/auth');

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const authRoutes = require('./auth');

router.use('/', authRoutes);

router.use(auth);

router.use('/users/me', usersRoutes);

router.use('/movies', moviesRoutes);

module.exports = router;
