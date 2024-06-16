const utilOpenAI = require('../utils/openai');
const {
  HistoryChat
} = require('../models');

const library = {}
module.exports = library

library.create = async (prompt, user_id) => {
  const additionalMessages = "";
  return utilOpenAI.openAIRequest(prompt, user_id, additionalMessages);
}

library.findAll = async (user_id) => {
  return await HistoryChat.findAll({
    where: { user_id },
    order: [['created_at', 'DESC']],
  });
}


