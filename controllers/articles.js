const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

// получение всех карточек
module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((data) => res.send(data))
    .catch(next); // эквивалентна .catch(err => next(err));
};

// создание карточки
module.exports.createArticle = (req, res, next) => {
  const { name, link } = req.body;

  Article.create({ name, link, owner: req.user._id })
    .then((article) => res.status(200).send(article))
    .catch(next);
};

// удаление карточки
module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;

  Article.findById(articleId)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((article) => {
      if (article.owner.toString() !== req.user._id) { // свойство user добавлено при авторизации
        throw new ForbiddenError('Недостаточно прав');
      }
      return Article.deleteOne({ _id: articleId })
        .then((response) => { // eslint-disable-line
          if (response.deletedCount !== 0) {
            return res.status(200).send({ message: 'Карточка удалена' });
          }
        })
        .catch(next);
    })
    .catch(next);
};
