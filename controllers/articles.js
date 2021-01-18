const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const { NOT_FOUND_CARD, FORBIDDEN, DEL_SUCCESS } = require('../utils/constants');

// получение всех карточек
module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((data) => res.send(data))
    .catch(next); // эквивалентна .catch(err => next(err));
};

// создание карточки
module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.status(200).send(article))
    .catch(next);
};

// удаление карточки
module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId).select('+owner')
    .orFail(new NotFoundError(NOT_FOUND_CARD))
    .then((article) => {
      if (article.owner.toString() !== req.user._id) { // свойство user добавлено при авторизации
        throw new ForbiddenError(FORBIDDEN);
      }
      return Article.deleteOne({ _id: articleId })
        .then((response) => {
          if (response.deletedCount !== 0) {
            return res.status(200).send({ message: DEL_SUCCESS });
          }
          throw new NotFoundError(NOT_FOUND_CARD);
        })
        .catch(next);
    })
    .catch(next);
};
