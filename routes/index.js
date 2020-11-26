var express = require('express'),
  router = express.Router(),
  debug = require('debug')('torre-upgrade-api:index');

/**
 * Default router
 */
router.get('/',
  function (request, response, next) {
    debug('get');
    response.render('index', { title: 'TORRE UPGRADE'});
  });

module.exports = router;