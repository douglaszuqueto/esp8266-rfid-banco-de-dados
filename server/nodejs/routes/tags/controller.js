const index = (req, res) => {
    res.json('index');
};

const show = (req, res) => {
    res.json('show');
};

const create = (req, res) => {
    res.json('create');
};

const update = (req, res) => {
    res.json('update');
};

const remove = (req, res) => {
    res.json('remove');
};

module.exports = {
    index: index,
    show: show,
    create: create,
    update: update,
    remove: remove
};