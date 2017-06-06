const model = require('../../models/logs');

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

const create = (req, res) => {
  return model.create(req.body)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

const update = (req, res) => {
  res.json('update');
};

const remove = (req, res) => {
  return model.remove(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  remove: remove
};
