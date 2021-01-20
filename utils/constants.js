const URL_REGEXP = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/;
const NOT_FOUND_USER = 'Нет пользователя с таким id';
const UNAUTHORIZED_USER = 'Неправильные почта или пароль';
const USER_EXISTS = 'Пользователь уже создан';
const NOT_FOUND_CARD = 'Карточка не найдена';
const FORBIDDEN = 'Недостаточно прав';
const DEL_SUCCESS = 'Карточка удалена';
const URL_INCORRECT = 'Ссылка некорректна';
const EMAIL_INCORRECT = 'Email некорректен';
const SOURCE_NOT_FOUND = 'Запрашиваемый ресурс не найден';

module.exports = {
  URL_REGEXP,
  NOT_FOUND_USER,
  UNAUTHORIZED_USER,
  USER_EXISTS,
  NOT_FOUND_CARD,
  FORBIDDEN,
  DEL_SUCCESS,
  URL_INCORRECT,
  EMAIL_INCORRECT,
  SOURCE_NOT_FOUND,
};
