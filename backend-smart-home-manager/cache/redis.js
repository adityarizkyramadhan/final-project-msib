const _ = require('lodash');
const redis = require('redis');
const redisMock = require('redis-mock');
const flaverr = require('flaverr');

const debug = require('./debug');

const ENV = process.env.NODE_ENV;

let client;
if (ENV === 'test') {
  client = redisMock.createClient();
} else {
  const opts = {};
  if (process.env.REDIS_HOST) {
    console.log(process.env.REDIS_HOST);
    opts.host = process.env.REDIS_HOST;
  }
  if (process.env.REDIS_PORT) {
    opts.port = process.env.REDIS_PORT;
  }
  if (process.env.REDIS_PASSWORD) {
    opts.password = process.env.REDIS_PASSWORD;
  }
  client = redis.createClient(opts);
  // client.on('error', (err) => debug.logError(err));
  // client.on('warning', (warning) => debug.logData('warning', warning));
  // client.on('connect', () => debug.logData('connect', 'redis is connected!'));
  // client.on('ready', () => debug.logData('ready', 'redis is ready!'));
  // client.on('reconnecting', () => debug.logData('reconnecting', 'redis is reconnecting...'));
  // client.on('end', () => debug.logData('end', 'redis is closed!'));
  // Connect to redis
  client.connect().then(() => {
    debug.logData('connect', 'redis is connected!');
  }).catch((err) => {
    debug.logError(err);
  });
}

// redis listener
// client.addListener('error', (err) => debug.logError(err));
// client.addListener('warning', (warning) => debug.logData('warning', warning));
// client.addListener('connect', () => debug.logData('connect', 'redis is connected!'));
// client.addListener('ready', () => debug.logData('ready', 'redis is ready!'));
// client.addListener('reconnecting', () => debug.logData('reconnecting', 'redis is reconnecting...'));
// client.addListener('end', () => debug.logData('end', 'redis is closed!'));

// const getAsync = promisify(client.get).bind(client);
// const setAsync = promisify(client.set).bind(client);
// const expireAsync = promisify(client.expire).bind(client);
// const keysAsync = promisify(client.keys).bind(client);
// const delAsync = promisify(client.del).bind(client);

/**
 * Get data from redis
 * @param {string} key Key dari data
 * @returns Object containing status and data or error
 */

const getData = async (key) => {
  try {
    // Ambil data dari redis
    if (client.isReady === false) {
      return true;
    }
    const result = await client.get(key);
    if (_.isNull(result) || _.isUndefined(result)) {
      return {
        status: true,
      };
    }
    return {
      status: true,
      data: JSON.parse(result),
    };
  } catch (err) {
    return {
      status: false,
      err,
    };
  }
};

/**
 * Set data to redis
 * @param {string} key Key dari data
 * @param {any} value Value dari data
 * @param {Number} time Value of time in minute
 * @returns Object status success or error
 */

const setData = async (key, value, time = 20) => {
  try {
    if (client.isReady === false) {
      return {
        status: true,
      };
    }
    await client.set(key, JSON.stringify(value));

    // FIXME: kira2 expire berapa lama ini itu per menit sekarang 20 menit
    await client.expire(key, time * 60);

    return {
      status: true,
    };
  } catch (err) {
    return {
      status: false,
      err: flaverr('E_REDIS', Error(err)),
    };
  }
};

/**
 * Delete data from redis by pattern
 * @param {string} pattern Pattern key dari data
 * @returns Object status success or error
 */

const deleteAllData = async (pattern) => {
  try {
    if (client.isReady === false) {
      return true;
    }
    const keys = await client.keys(pattern);

    // eslint-disable-next-line no-return-await
    keys.forEach(async (key) => await client.del(key));

    return {
      status: true,
    };
  } catch (err) {
    return {
      status: false,
      err: flaverr('E_REDIS', Error(err)),
    };
  }
};

module.exports = {
  getData,
  setData,
  deleteAllData,
};
