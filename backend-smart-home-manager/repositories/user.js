const {
  User
} = require('../models');

const library = {};
module.exports = library;

library.findByID = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

library.findAll = async () => {
  const users = await User.findAll();
  return users;
};
