const router = require('express').Router();

const { createUser, login, lognout } = require('../controllers/users');

const { signupValidate, signinValidate } = require('../middlewares/validate');

router.post('/signup', signupValidate, createUser);

router.post('/signin', signinValidate, login);

router.use('/signout', lognout);

module.exports = router;
