const router = require('express').Router();
const { login } = require('../controllers/users');
const { validateSignin } = require('../middlewares/routers-validater');

router.post('/', validateSignin, login);

module.exports = router;
