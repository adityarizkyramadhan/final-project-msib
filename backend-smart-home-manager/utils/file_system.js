const path = require('path');
const basename = path.basename(__filename);
const fs = require('fs');

const fileSystem = {};

fileSystem.listAllFile = function (path, extension, showExtension, next) {
  const returns = [];
  fs.readdirSync(path)
    .filter((file) => {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === extension
      );
    })
    .forEach((file) => {
      let current = file;
      if (!showExtension) {
        current = current.split('.')[0];
        next(current);
      }
    });

  return returns;
};

module.exports = fileSystem;
