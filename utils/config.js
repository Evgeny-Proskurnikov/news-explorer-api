const DEV_SECRET = 'dev-secret';
const DEV_DB_HOST = 'mongodb://localhost:27017/newsdb';
const SALT_ROUNDS = 10;
const HOSTS = [
  'http://localhost:3000',
  'http://www.api.news-explorer.evpro.students.nomoreparties.xyz',
  'https://www.api.news-explorer.evpro.students.nomoreparties.xyz',
  'http://api.news-explorer.evpro.students.nomoreparties.xyz',
  'https://api.news-explorer.evpro.students.nomoreparties.xyz',
  'http://www.news-explorer.evpro.students.nomoreparties.xyz',
  'https://www.news-explorer.evpro.students.nomoreparties.xyz',
  'http://news-explorer.evpro.students.nomoreparties.xyz',
  'https://news-explorer.evpro.students.nomoreparties.xyz',
]

module.exports = {
  DEV_SECRET,
  DEV_DB_HOST,
  SALT_ROUNDS,
  HOSTS,
};
