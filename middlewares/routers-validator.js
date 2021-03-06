const { Joi, celebrate, CelebrateError } = require('celebrate');
const validator = require('validator');

const validateUrl = (v) => {
  if (!validator.isURL(v)) {
    throw new CelebrateError();
  }
  return v;
};

const validateGetArts = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
});

const validateCreateArt = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom(validateUrl),
    image: Joi.string().required().custom(validateUrl),
  }),
});

const validateDelArt = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24).required(),
  }),
});

const validateGetUserMe = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  validateCreateArt,
  validateDelArt,
  validateGetArts,
  validateGetUserMe,
  validateSignin,
  validateSignup,
};
