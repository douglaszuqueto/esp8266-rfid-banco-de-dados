const basePath = `${process.env.APP_URL}api/`;

module.exports = {
  endpoints: {
    'users': `${basePath}users/`,
    'tags': `${basePath}tags/`,
    'log': `${basePath}logs/`
  }
}
;
