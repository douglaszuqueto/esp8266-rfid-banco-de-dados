const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , app = express();

/* load dotenv */
require('dotenv').load();
const config = require('./config/config');

/* Middlewares */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

/* Routes */
app.use('/api', require('./routes/main'));

/* App listen */
app.listen(3000, () => console.log(`nodejs-backend is running`));

/* mqtt */
require('./mqtt');