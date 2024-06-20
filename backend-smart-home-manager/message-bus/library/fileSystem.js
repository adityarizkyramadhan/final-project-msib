const path = require('path');

const basename = path.basename(__filename);
const fs = require('fs');

const fileSystem = {};

fileSystem.listAllFile = function (path, extension, showExtension, next) {
  const returns = [];
  fs.readdirSync(path)
    .filter((file) => (
      file.indexOf('.') !== 0
      && file !== basename
      && file.slice(-3) === extension
    ))
    .forEach((file) => {
      let current = file;
      if (showExtension == false) {
        current = current.split('.')[0];
        next(current);
      }
    });

  return returns;
};

fileSystem.listAllFile(__dirname, '.js');

module.exports = fileSystem;
