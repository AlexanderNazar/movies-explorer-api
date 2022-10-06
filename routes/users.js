const router = require('express').Router();

const { updateUserValidate } = require('../middlewares/validate');

const { getUserInfo, updateUserInfo } = require('../controllers/users');

router.get('/', getUserInfo);

router.patch('/', updateUserValidate, updateUserInfo);

module.exports = router;
