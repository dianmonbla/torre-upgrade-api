require('./shared/globals');

var createError = require('http-errors'),
  express = require('express'),
  cookieParser = require('cookie-parser'),
  env = require('node-env-file'),
  bodyParser = require('body-parser'),
  app = express(),
  cors = require('cors'),
  helmet = require('helmet');

// Development environment
if (!process.env.NODE_ENV)
  env(__dirname + '/.env');

/**
 * IMPORTANT PENDING INTEGRATION
 * [rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible) counts
 * and limits number of actions by key and protects from DDoS and brute force attacks 
 * at any scale.
 * 
 * it works with Redis, process Memory, Cluster or PM2, Memcached, MongoDB, MySQL, PostgreSQL and allows to control requests rate in single process or distributed environment.
 */

// Minimal protection
app.use(helmet());

app.use(cors())

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// Parse application/json
app.use(bodyParser.json())

app.use(cookieParser());

// Engine views
app.set('view engine', 'pug')

// Routes
app.use('/', require('./routes/index'));
app.use('/bios', require('./routes/bios'));
app.use('/opportunities', require('./routes/opportunities'));
app.use('/people', require('./routes/people'));

// Catch 404 and forward to error handler
app.use(function (request, response, next) {
  next(createError(404));
});

// Error handler
app.use(function (error, request, response, next) {
  // Render the error page
  response.status(error.status || 500);
  response.json(error);
});

module.exports = app;