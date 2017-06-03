const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , app = express();

/* load dotenv */
require('dotenv').load();
const config = require('./config/config');

/* Middlewares */
app.use(cors());
app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());

/* Routes */
app.use('/api', require('./routes'));

/* App listen */
app.listen(3000, () => console.log(`nodejs-backend is running`));