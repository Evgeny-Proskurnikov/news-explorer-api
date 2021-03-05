const DEV_SECRET = 'dev-secret';
const DEV_DB_HOST = 'mongodb://localhost:27017/newsdb';
const SALT_ROUNDS = 10;
const HOSTS = [
  'http://localhost:3000',
  'http://www.api.newsexplorer.evpro.students.nomoredomains.rocks',
  'https://www.api.newsexplorer.evpro.students.nomoredomains.rocks',
  'http://api.newsexplorer.evpro.students.nomoredomains.rocks',
  'https://api.newsexplorer.evpro.students.nomoredomains.rocks',
  'http://www.newsexplorer.evpro.students.nomoredomains.rocks',
  'https://www.newsexplorer.evpro.students.nomoredomains.rocks',
  'http://newsexplorer.evpro.students.nomoredomains.rocks',
  'https://newsexplorer.evpro.students.nomoredomains.rocks',
];

module.exports = {
  DEV_SECRET,
  DEV_DB_HOST,
  SALT_ROUNDS,
  HOSTS,
};
