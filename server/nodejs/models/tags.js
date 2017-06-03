const db = require('./db');

const table = 'tags';

const all = () => {
    return db.all(table);
};

const find = (id) => {
    return db.find(table, id);
};

const searchByTag = (tag) => {
    return db.query(`SELECT * FROM ${table} WHERE tag = ${tag} LIMIT 1`)
};

module.exports = {
    all: all,
    find: find,
    searchByTag: searchByTag,
};