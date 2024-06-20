const fs = require('fs');
const path = require('path');
const fileSystem = require('../library/fileSystem');
const debug = require('../library/debug');
const config = require('../config');
const _ = require('lodash')


const subscribers = [];

fileSystem.listAllFile(__dirname, '.js', false, requireAllRouter);

function requireAllRouter(fileName) {
  const requiredFile = `./${fileName}`;
  if (fileName != 'index') {
    const cursubscriber = require(requiredFile);
    if (_.isPlainObject(cursubscriber)) {
      subscribers.push(cursubscriber);
    }
    else if (_.isArray(cursubscriber)) {
      cursubscriber.forEach((subs) => {
        subscribers.push(subs)
      })
    }
  }
}

module.exports = subscribers;
