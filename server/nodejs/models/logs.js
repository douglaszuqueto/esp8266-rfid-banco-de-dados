const db = require('./db');

const table = 'access_log';

const all = () => {
  return db.all(table);
};

const find = (id) => {
  return db.find(table, id);
};

const create = (data) => {
  const query = `INSERT INTO ${table} (id_user, id_tag, status) VALUES (${data.id_user}, ${data.id_tag}, ${data.status});`;

  return db.query(query);
};

const remove = (id) => {
  return db.remove(table, id);
};

module.exports = {
  all: all,
  find: find,
  create: create,
  remove: remove
};
