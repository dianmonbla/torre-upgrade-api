require('./shared/globals');

var createError = require('http-errors'),
  express = require('express'),
  cookieParser = require('cookie-parser'),
  env = require('node-env-file'),
  bodyParser = require('body-parser'), // .env file
  app = express(),
  cors = require('cors');

// Development environment
if (!process.env.NODE_ENV)
  env(__dirname + '/.env');

app.use(cors())

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// Parse application/json
app.use(bodyParser.json())

app.use(cookieParser());

// Routes
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
