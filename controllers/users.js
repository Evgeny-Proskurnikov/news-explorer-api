const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ConflictError = require('../errors/conflict-err');
const { DEV_SECRET, SALT_ROUNDS } = require('../utils/config');
const { NOT_FOUND_USER, UNAUTHORIZED_USER, USER_EXISTS } = require('../utils/constants');

// получение текущего пользователя
module.exports.getUserMe = (req, res, next) => {
  const currentUserId = mongoose.Types.ObjectId(req.user._id);
  User.findById(currentUserId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_USER);
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
        throw new UnauthorizedError(UNAUTHORIZED_USER);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(UNAUTHORIZED_USER);
          }
          const { JWT_SECRET, NODE_ENV } = process.env;
          const token = jwt.sign( // создаем токен
            { _id: user._id }, // Пейлоуд токена — зашифрованный в строку объект пользователя
            NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET, // секретный ключ подписи для шифрования
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
        throw new ConflictError(USER_EXISTS);
      }
      // хешируем пароль
      // SALT_ROUNDS - длина «соли» — случайной строки,
      // которую метод добавит к паролю перед хешированием
      bcrypt.hash(password, SALT_ROUNDS)
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
