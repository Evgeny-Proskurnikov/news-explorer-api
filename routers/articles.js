const router = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { validateGetArts, validateCreateArt, validateDelArt } = require('../middlewares/routers-validater');

router.get('/', validateGetArts, getArticles);
router.post('/', validateCreateArt, createArticle);
router.delete('/:articleId', validateDelArt, deleteArticle);

module.exports = router;
