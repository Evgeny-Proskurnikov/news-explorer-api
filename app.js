require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const { DEV_DB_HOST, HOSTS } = require('./utils/config');
const { limiter } = require('./middlewares/rate-limiter');
const routers = require('./routers/index');

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

app.use(cors({ origin: HOSTS }));

app.use(requestLogger); // подключаем логгер запросов

app.use(limiter);

app.use(bodyParser.json());

app.use('/', routers);

app.use(errorLogger); // подключаем логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

// мидлвэр для централизованной обработки ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
