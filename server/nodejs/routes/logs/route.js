const express = require('express')
    , router = express.Router()
    , controller = require('./controller');

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/', controller.remove);

module.exports = router;