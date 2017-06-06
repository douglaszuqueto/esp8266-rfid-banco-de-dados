const mysql = require('mysql')
  , config = require('../config/config')
  , Promise = require('promise');

const options = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
};

const db = mysql.createConnection(options);
db.connect();

const all = (table) => {
  return new Promise((resolve, reject) => {
    executeQuery(`SELECT * FROM ${table}`, resolve, reject)
  });
};

const find = (table, id) => {
  return new Promise((resolve, reject) => {
    executeQuery(`SELECT * FROM ${table} WHERE id = ${id}`, resolve, reject)
  });
};

const query = (query) => {
  return new Promise((resolve, reject) => {
    executeQuery(query, resolve, reject)
  });
};

const remove = (table, id) => {
  return new Promise((resolve, reject) => {
    executeQuery(`DELETE FROM ${table} WHERE id = ${id}`, resolve, reject)
  });
};

const executeQuery = (query, resolve, reject) => {
  return db.query(query, (err, results) => {
    if (err) return reject(err);

    return resolve(results);
  });
};

module.exports = {
  connection: db,
  query: query,
  all: all,
  find: find,
  remove: remove
};
