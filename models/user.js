const mongoose = require('mongoose');
const npmValidator = require('validator');

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
      message: 'Email некорректен',
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // по умолчанию хеш пароля пользователя не будет возвращаться из базы
    minlength: 8,
    validate: {
      validator(v) {
        return /[a-z0-9]*/i.test(v);
      },
      message: 'Пароль некорректен',
    },
  },
});

// в схеме select: false не срабатывает, поэтому модифицируем объект ответа
// userSchema.methods.toJSON = function () { // eslint-disable-line
//   const obj = this.toObject();
//   delete obj.password;
//   return obj;
// };

module.exports = mongoose.model('user', userSchema);
