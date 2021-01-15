const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const BadRequestError = require('../errors/bad-request-err');

// получение текущего пользователя
module.exports.getUserMe = (req, res, next) => {
  const currentUserId = mongoose.Types.ObjectId(req.user._id);
  User.findById(currentUserId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      return res.send(user);
    })
    .catch(next);
};

// login пользователя
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password') // добавляем в объект user хеш пароля
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          const { JWT_SECRET, NODE_ENV } = process.env;
          const token = jwt.sign( // создаем токен
            { _id: user._id }, // Пейлоуд токена — зашифрованный в строку объект пользователя
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', // секретный ключ подписи для шифрования
            { expiresIn: '7d' },
          );
          return res.status(200).send({ token });
        });
    })
    .catch(next);
};

// создание нового пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  User.findOne({ email })
    .then((data) => {
      if (data && data.email === email) {
        throw new BadRequestError('Пользователь уже создан');
      }
      // хешируем пароль
      // 10 - длина «соли» — случайной строки, которую метод добавит к паролю перед хешированием
      bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({ // создаем пользователя
            name, email, password: hash, // записываем хеш в базу
          })
            .then((user) => {
              res.status(200).send(user);
            })
            .catch(next);
        })
        .catch(next);
    })
    .catch(next);
};
