const fs = require('fs')

let jsonFile = "default.json"
if (process.env.NODE_ENV) {
  jsonFile = process.env.NODE_ENV + '.json';
  if (!fs.existsSync(__dirname + jsonFile)) {
    jsonFile = 'default.json'
  }
}

const jsonENV = require('./json-to-env');

const config = {}
config.input = __dirname + '/default.json'
config.output = __dirname + '/../.env'
jsonENV(config);
