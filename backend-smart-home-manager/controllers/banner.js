const bannerRepo = require('../repositories/banner');
const { success } = require('../utils/http_res');
const library = {}
module.exports = library

library.findAll = async (req, res, next) => {
  try {
    const banners = await bannerRepo.findAll()
    return success(res, 200, banners, 'Banners retrieved')
  } catch (error) {
    next(error)
  }
}
