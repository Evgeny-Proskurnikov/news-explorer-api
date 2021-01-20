const router = require('express').Router();
const { createUser } = require('../controllers/users');
const { validateSignup } = require('../middlewares/routers-validater');

router.post('/', validateSignup, createUser);

module.exports = router;
