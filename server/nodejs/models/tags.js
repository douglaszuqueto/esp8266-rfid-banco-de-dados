const db = require('./db');

const table = 'tags';

const all = () => {
    return db.all(table);
};

const find = (id) => {
    return db.find(table, id);
};

const searchByTag = (tag) => {
    return db.query(`SELECT * FROM ${table} WHERE tag = '${tag}'`)
};

const create = (data) => {
    const query = `INSERT INTO ${table} (id_user, tag) VALUES (1, '${data.tag}');`;

    return db.query(query);
};

module.exports = {
    all: all,
    find: find,
    searchByTag: searchByTag,
    create: create
};