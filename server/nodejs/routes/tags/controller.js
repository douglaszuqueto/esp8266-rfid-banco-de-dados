const model = require('../../models/tags');

const index = (req, res) => {
    return model.all()
        .then((data) => res.json(data))
        .catch((err) => res.json(err))
};

const show = (req, res) => {
    return model.find(req.params.id)
        .then((data) => res.json(data[0]))
        .catch((err) => res.json(err))
};

const searchByTag = (req, res) => {
    return model.searchByTag(req.params.tag)
        .then((data) => {
            const tag = data[0];

            if (!tag) res.json({});

            res.json(tag);
        })
        .catch((err) => res.json(err))
};

const create = (req, res) => {
    return model.create(req.body)
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
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
    searchByTag: searchByTag,
    create: create,
    update: update,
    remove: remove
};