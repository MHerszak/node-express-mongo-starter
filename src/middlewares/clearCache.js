const { clearHash } = require("./../services/cache");

/**
 * This middleware is supposed to clear the cache, if
 * the route handler returns successful.
 */
module.exports = async (request, response, next) => {
  // wait for router hadler to return
  await next();
  // is successfull clear the cash
  clearHash(request.body.user.id);
};
