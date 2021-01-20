const router = require('express').Router();
const { getUserMe } = require('../controllers/users');
const { validateGetUserMe } = require('../middlewares/routers-validater');

router.get('/me', validateGetUserMe, getUserMe);

module.exports = router;
