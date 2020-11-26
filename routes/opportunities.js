var express = require('express'),
  router = express.Router(),
  createError = require('http-errors'),
  axiosSingleton = require('../shared/axiosSingleton')(),
  debug = require('debug')('torre-upgrade-api:opportunities'),
  TORRE_RESOURCE_API = process.env.TORRE_RESOURCE_API,
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

    axiosSingleton.post(`${TORRE_SEARCH_RESOURCE_API}/opportunities/_search?${queryParams.join('&')}`, {})
      .then(function (torreResponse) {
        debug('post', torreResponse.data);
        response.json(torreResponse.data).end();
      })
      .catch(function (error) {
        debug('post', 'error', error);
        next(new createError(error));
      });
  });

/**
 * Gets job information of ID
 */
router.get('/:id',
  function (request, response, next) {
    debug('get', 'request.params.id', request.params.id);
    axiosSingleton.get(`${TORRE_RESOURCE_API}/opportunities/${request.params.id}`)
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