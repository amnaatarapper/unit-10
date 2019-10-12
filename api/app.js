'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// enable all cors requests
app.use(cors());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// PARSE HTTP RES/REQ
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// SEQUELIZE
const db = require('./db');

// DB CONNECTION TEST
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    // return db.sequelize.sync();
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
// On /api request use routes.js
app.use('/api', routes);


// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
