const express = require('express')
    , router = express.Router();

/* user routes */
router.use('/users', require('./users/route'));

/* tag routes */
router.use('/tags', require('./tags/route'));

/* log routes */
router.use('/logs', require('./logs/route'));

module.exports = router;