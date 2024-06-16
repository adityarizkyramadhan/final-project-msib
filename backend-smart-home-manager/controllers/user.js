const userRepo = require('../repositories/user');
const { success } = require('../utils/http_res');

const library = {};
module.exports = library;

library.getAll = async (req, res, next) => {
  try {
    const users = await userRepo.findAll();
    return success(res, 200, users, 'Get all users success');
  } catch (err) {
    next(err);
  }
}

library.getOne = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await userRepo.findByID(id);
    return success(res, 200, user, 'Get user success');
  } catch (err) {
    next(err);
  }
}
