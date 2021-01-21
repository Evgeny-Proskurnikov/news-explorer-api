const router = require('express').Router();
const { getUserMe } = require('../controllers/users');
const { validateGetUserMe } = require('../middlewares/routers-validator');

router.get('/me', validateGetUserMe, getUserMe);

module.exports = router;
