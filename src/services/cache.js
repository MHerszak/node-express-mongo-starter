const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");
const config = require("./../config/keys");

const client = redis.createClient(config.redisUrl);
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

/**
 * If this function is chained on a request to mongoose,
 * it will set _cach to true and you can only cache for
 * the specific model
 */
mongoose.Query.prototype.cache = function (options = {}) {
  this._cache = true;
  // make it chainable
  this._hasKey = JSON.stringify(options.key || "default");
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this._cache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name
  }));

  // See if we have avalue for key in redis,
  const cacheValue = await client.hget(this._hasKey, key);

  // if we do return redis
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);

    if (Array.isArray(doc)) {
      return doc.map(d => new this.model(d));
    }

    return new this.model(doc);
  }

  // else issue the query and store the result in redis
  const result = await exec.apply(this, arguments);

  client.hset(this._hasKey, key, JSON.stringify(result), "EX", 10);

  return result;
}

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  }
}