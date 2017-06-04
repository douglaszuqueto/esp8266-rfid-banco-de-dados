const db = require('./db');

const table = 'access_log';

const all = () => {
    return db.all(table);
};

const find = (id) => {
    return db.find(table, id);
};

const create = (data) => {
    const query = `INSERT INTO ${table} (id_user, tag, status) VALUES (${data.id_user}, '${data.tag}', ${data.status});`;

    return db.query(query);
};

module.exports = {
    all: all,
    find: find,
    create: create
};