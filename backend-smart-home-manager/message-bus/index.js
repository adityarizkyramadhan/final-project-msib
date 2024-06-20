const amqp = require('amqplib');
const _ = require('lodash');
const subscribers = require('./subscribers');
const debug = require('./library/debug');
const flaverr = require('flaverr');

debug.log('loading message-bus...');
const environment = process.env.NODE_ENV;
const config = require('./config')[environment];

const rabbitObject = {
  connection: null,
  publisherChannel: null,
  subscribers: null,
  err: null,

  fnConnect: connect,
  fnSubscribe: subscribe,
  fnPublish: publish,
  fnIsConnected: isConnected,
};

/// ///////////////////////////////////////////////////////////////
// Helper Functions
async function connect(url) {
  rabbitObject.connection = await amqp.connect(`amqp://${url}`);
  rabbitObject.connection.on('error', (err) => {
    rabbitObject.err = err;
    debug.log(err);
  });
  rabbitObject.connection.on('close', () => {
    rabbitObject.connection = null;
    debug.log('connection closed');
  });
  rabbitObject.connection.on('blocked', (reason) => {
    debug.log('connection blocked', reason);
  });
  rabbitObject.publisherChannel = await rabbitObject.connection.createChannel();
  debug.log('connected to rabbitmq');
}

function isConnected() {
  return rabbitObject.connection != null;
}

async function subscribe(_key, _handler = async (msg) => { }, validator) {
  if (!isConnected()) throw 'not connected!';
  const key = _key;
  const handler = _handler;
  const exchange = config.service_name;
  const channel = await rabbitObject.connection.createChannel();
  const ex = await channel.assertExchange(exchange, 'direct', { durable: true });
  const q = await channel.assertQueue(`${exchange}.${_key}`, { exclusive: false });

  channel.bindQueue(q.queue, exchange, key);

  channel.consume(q.queue, async (msg) => {
    try {
      const process = await handler(msg);

      if (msg.properties.replyTo && msg.properties.replyTo != '') {
        const replyTo = msg.properties.replyTo.split('@');
        await publish(replyTo[1], replyTo[0], process, {
          headers: msg.properties.headers,
          messageId: msg.properties.messageId,
        });
      }
      channel.ack(msg);
    } catch (err) {
      const errorMessage = { eventKey: `${exchange}.${_key}`, err, input: msg };
      publishDeadLetter(JSON.stringify(errorMessage, null, 4));
    }
  }, { noAck: false });

  channel.prefetch(1);

  return `subscribed to ${exchange} on key ${key}`;
}

async function publish(service_name, event_key, msg, options = {
  headers, replyTo, messageId,
}) {
  try {
    // check connection
    if (!isConnected()) throw 'not connected!';

    // parse msg to JSON object
    let parsedMsg = msg;
    if (!_.isObject(parsedMsg)) {
      parsedMsg = JSON.parse(msg);
      const valid = _.has(parsedMsg, 'body') && _.has(parsedMsg, 'headers');

      if (!valid) throw 'msg has to be an object that contain field: body, headers';
    }

    rabbitObject.publisherChannel.publish(
      service_name,
      event_key,
      Buffer.from(JSON.stringify(parsedMsg, null, 4)),
      { ...options },
    );
  } catch (err) {
    throw err;
  }
}

/* TODO */
async function publishDeadLetter(msg) {
  if (!isConnected()) throw 'not connected!';
  const channel = await rabbitObject.connection.createChannel();
  const queue = 'dead-letter';
  channel.assertQueue(queue, {
    durable: true,
  });

  channel.sendToQueue(queue, Buffer.from(msg));
}

/// ///////////////////////////////////////////////////////////////
// Exports
module.exports = async () => {
  const { host } = config;
  const { user } = config;
  const { password } = config;
  const { port } = config;

  // validations
  if (host && !_.isString(host)) throw flaverr('E_VALIDATION', new Error('host has to be string'));
  if (user && !_.isString(user)) throw flaverr('E_VALIDATION', new Error('user has to be string'));
  if (password && !_.isString(password)) throw flaverr('E_VALIDATION', new Error('password has to be string'));
  if (port && !_.isString(port)) throw flaverr('E_VALIDATION', new Error('port has to be string'));

  // initializing logs data
  const logs = {
    key: 'MESSAGE_BUS_INITIALIZATION', exchange: config.service_name, subscriber: [], log_stacks: [],
  };

  // building full URL
  const url = `${host}`;


  debug.log('connecting to rabbitmq...');
  debug.log(url);

  // if no error, return rabbitObject
  if (!rabbitObject.err) {
    try {
      if (!rabbitObject.connection) {
        await connect(url);
        logs.url = url;

        const promise = subscribers.map(async (value) => {
          logs.subscriber.push(value.key);
          // subscribe function returning log string mendefinisikan status proses subscribtion
          return subscribe(value.key, value.handler);
        });

        // setelah semua subscribtion selesai, get semua log dalam bentuk array
        const result = await Promise.all(promise);
        logs.log_stacks = result;
        debug.log(logs);

        rabbitObject.subscribers = subscribers;
      }

      return rabbitObject;
    } catch (err) {
      rabbitObject.err = err;
      logs.err = err;
      debug.log(logs);
    }
  }
};
