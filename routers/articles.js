const { Joi, celebrate } = require('celebrate');
const router = require('express').Router();
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

router.get('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
}), getArticles);

router.post('/', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().pattern(/^https?:\/\/[a-z0-9\W\_]+#?$/i, 'url'), // eslint-disable-line
    image: Joi.string().required().pattern(/^https?:\/\/[a-z0-9\W\_]+#?$/i, 'url'), // eslint-disable-line
  }),
}), createArticle);

router.delete('/:articleId', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(),
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24).required(),
  }),
}), deleteArticle);

module.exports = router;