var express = require('express'),
  router = express.Router(),
  createError = require('http-errors'),
  axiosSingleton = require('../shared/axiosSingleton')(),
  debug = require('debug')('torre-upgrade-api:people'),
  TORRE_SEARCH_RESOURCE_API = process.env.TORRE_SEARCH_RESOURCE_API;

/**
 * You can see how it's being used here: https://torre.co/search
 */
router.post('/_search',
  function (request, response, next) {
    debug('post', 'request.query', JSON.stringify(request.query));

    let queryParams = [];

    if (request.query.aggregate)
      queryParams.push(`aggregate=${request.query.aggregate}`);

    if (request.query.offset)
      queryParams.push(`offset=${Number(request.query.offset)}`);

    if (request.query.size)
      queryParams.push(`size=${Number(request.query.size)}`);

    axiosSingleton.post(`${TORRE_SEARCH_RESOURCE_API}/people/_search?${queryParams.join('&')}`, {})
      .then(function (torreResponse) {
        debug('post', torreResponse.data);
        response.json(torreResponse.data).end();
      })
      .catch(function (error) {
        debug('post', 'error', error);
        next(new createError(error));
      });
  });

module.exports = router;