const mongoose = require('mongoose');
const npmValidator = require('validator');
const { EMAIL_INCORRECT } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return npmValidator.isEmail(v);
      },
      message: EMAIL_INCORRECT,
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // по умолчанию хеш пароля пользователя не будет возвращаться из базы
  },
});

// в схеме select: false не срабатывает, поэтому модифицируем объект ответа
// баг метода create в mongoose
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('user', userSchema);
