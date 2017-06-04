const express = require('express')
    , router = express.Router()
    , controller = require('./controller');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/tag/:tag', controller.searchByTag);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;