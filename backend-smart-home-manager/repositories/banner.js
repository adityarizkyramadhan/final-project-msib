const {
  Banner
} = require('../models');

const library = {}
module.exports = library

library.findAll = async () => {
  return await Banner.findAll()
}
