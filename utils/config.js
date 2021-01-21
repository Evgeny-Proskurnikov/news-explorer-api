const DEV_SECRET = 'dev-secret';
const DEV_DB_HOST = 'mongodb://localhost:27017/newsdb';
const SALT_ROUNDS = 10;
const HOSTS = [
  'http://localhost:3000',
  'http://www.api.nexplorer.evpro.students.nomoreparties.xyz',
  'https://www.api.nexplorer.evpro.students.nomoreparties.xyz',
  'http://api.nexplorer.evpro.students.nomoreparties.xyz',
  'https://api.nexplorer.evpro.students.nomoreparties.xyz',
  'http://www.nexplorer.evpro.students.nomoreparties.xyz',
  'https://www.nexplorer.evpro.students.nomoreparties.xyz',
  'http://nexplorer.evpro.students.nomoreparties.xyz',
  'https://nexplorer.evpro.students.nomoreparties.xyz',
];

module.exports = {
  DEV_SECRET,
  DEV_DB_HOST,
  SALT_ROUNDS,
  HOSTS,
};
