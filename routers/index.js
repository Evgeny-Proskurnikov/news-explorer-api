const router = require('express').Router();
const articlesRouter = require('./articles');
const usersRouter = require('./users');
const signinRouter = require('./signin');
const signupRouter = require('./signup');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');
const { SOURCE_NOT_FOUND } = require('../utils/constants');

router.use('/signin', signinRouter);
router.use('/signup', signupRouter);
router.use('/users', auth, usersRouter); // если авторизация не пройдет usersRouter не выполнится
router.use('/articles', auth, articlesRouter);
router.use('*', () => {
  throw new NotFoundError(SOURCE_NOT_FOUND);
});

module.exports = router;
