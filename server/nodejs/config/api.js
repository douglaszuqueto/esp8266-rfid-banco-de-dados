const basePath = 'http://127.0.0.1:3000/api/';

module.exports = {
    endpoints: {
        'users': `${basePath}users/`,
        'tags': `${basePath}tags/`,
        'log': `${basePath}logs/`
    }
}
;