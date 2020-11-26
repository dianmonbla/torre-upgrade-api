var express = require('express'),
  router = express.Router(),
  createError = require('http-errors'),
  axiosSingleton = require('../shared/axiosSingleton')(),
  debug = require('debug')('torre-upgrade-api:bios'),
  TORRE_BIO_RESOURCE_API = process.env.TORRE_BIO_RESOURCE_API;

/**
 * Gets bio information of username
 */
router.get('/:username',
  function (request, response, next) {
    debug('get', 'request.params.username', request.params.username);
    axiosSingleton.get(`${TORRE_BIO_RESOURCE_API}/bios/${request.params.username}`)
      .then(function (torreResponse) {
        debug('post', torreResponse.data);
        response.json(torreResponse.data).end();
      })
      .catch(function (error) {
        debug('post', 'error', error);
        next(createError(error));
      });
  });

module.exports = router;