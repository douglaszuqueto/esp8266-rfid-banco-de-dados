const db = require('./db');

const table = 'access_log';

const all = () => {
    return db.all(table);
};

const find = (id) => {
    return db.find(table, id);
};

module.exports = {
    all: all,
    find: find
};