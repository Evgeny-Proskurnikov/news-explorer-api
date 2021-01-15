const { Joi, celebrate } = require('celebrate');
const router = require('express').Router();
const {
  getUserMe,
} = require('../controllers/users');

router.get('/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
}), getUserMe);

module.exports = router;
