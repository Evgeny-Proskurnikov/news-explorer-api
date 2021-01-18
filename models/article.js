const mongoose = require('mongoose');
const npmValidator = require('validator');
const { URL_INCORRECT } = require('../utils/constants');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return npmValidator.isURL(v);
      },
      message: URL_INCORRECT,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return npmValidator.isURL(v);
      },
      message: URL_INCORRECT,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false, // по умолчанию не будет возвращаться из базы
    required: true,
  },
});

// в схеме select: false не срабатывает, поэтому модифицируем объект ответа
// баг метода create в mongoose
articleSchema.methods.toJSON = function () { // eslint-disable-line
  const obj = this.toObject();
  delete obj.owner;
  return obj;
};

const articleModel = mongoose.model('article', articleSchema);

module.exports = articleModel;
