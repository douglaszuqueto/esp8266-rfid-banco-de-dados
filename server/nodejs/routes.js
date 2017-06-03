const express = require('express')
    , router = express.Router();

router.get('/users', (req, res) => {
    res.json('users');
});

router.get('/tags', (req, res) => {
    res.json('tags');
});

module.exports = router;