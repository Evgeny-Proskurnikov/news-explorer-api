require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Joi, celebrate, errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { usersRouter, articlesRouter } = require('./routers/index');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const { DEV_DB_HOST, HOSTS } = require('./utils/config');
const { SOURCE_NOT_FOUND } = require('./utils/constants');
const NotFoundError = require('./errors/not-found-err');
const { limiter } = require('./middlewares/rate-limiter');

const { PORT = 3000, NODE_ENV, DB_HOST } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect(NODE_ENV === 'production' ? DB_HOST : DEV_DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());

app.use(limiter);

app.use(cors({ origin: HOSTS }));

app.use(requestLogger); // подключаем логгер запросов

app.use(bodyParser.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

app.use('/users', auth, usersRouter); // если авторизация не пройдет usersRouter не выполнится
app.use('/articles', auth, articlesRouter);
app.use('*', () => {
  throw new NotFoundError(SOURCE_NOT_FOUND);
});

app.use(errorLogger); // подключаем логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

// мидлвэр для централизованной обработки ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`); // eslint-disable-line
});
