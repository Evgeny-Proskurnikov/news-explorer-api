const router = require('express').Router();
const { login } = require('../controllers/users');
const { validateSignin } = require('../middlewares/routers-validator');

router.post('/', validateSignin, login);

module.exports = router;
