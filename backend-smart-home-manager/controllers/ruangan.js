const ruanganRepo = require('../repositories/ruangan');
const { success } = require('../utils/http_res')
const library = {}
module.exports = library

library.findAll = async (req, res, next) => {
  try {
    const user_id = req.user.id
    const ruangans = await ruanganRepo.findAll({
      params: {
        user_id
      }
    })
    return success(res, 200, ruangans, 'Ruangans retrieved')
  } catch (error) {
    next(error)
  }
}
