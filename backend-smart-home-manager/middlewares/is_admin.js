const flaverr = require('flaverr');
module.exports = {
  // Buat middleware hanya untuk admin
  isAdmin: (req, res, next) => {
    const role = req.user.role;
    if (role === 'admin') {
      next();
    } else {
      throw flaverr('E_FORBIDDEN', Error('Only admin can access this route'));
    }
  },
  // Buat middleware hanya untuk user
  isUser: (req, res, next) => {
    const role = req.user.role
    if (role === 'user') {
      next();
    } else {
      throw flaverr('E_FORBIDDEN', Error('Only user can access this route'));
    }
  },
};
