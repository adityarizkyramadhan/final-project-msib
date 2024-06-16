const chatRepo = require('../repositories/chat');
const { success } = require('../utils/http_res');

const library = {}
module.exports = library

library.create = async (req, res) => {
  const { prompt } = req.body;
  const { id } = req.user;
  const response = await chatRepo.create(prompt, id);
  return success(res, 200, response, 'Chat created successfully');
}

library.findAll = async (req, res) => {
  const { id } = req.user;
  const response = await chatRepo.findAll(id);
  return success(res, 200, response, 'Chat found successfully');
}
