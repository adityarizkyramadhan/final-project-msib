const {
  Ruangan,
} = require('../models')
const {
  Op
} = require('sequelize');

const library = {};
module.exports = library;

library.findAll = async ({
  params = {},
  transaction = null
}) => {
  const where = {};
  if (params.user_id) {
    where.user_id = {
      [Op.or]: {
        [Op.eq]: params.user_id,
        [Op.eq]: null
      }
    };
  } else {
    where.user_id = null;
  }
  const data = await Ruangan.findAll({
    where: where,
    transaction: transaction
  });
  return data;
}

library.findByID = async ({
  id,
  transaction = null
}) => {
  const data = await Ruangan.findByPk(id, {
    transaction: transaction
  });
  return data;
}

library.create = async ({
  body,
  transaction = null
}) => {
  const data = await Ruangan.create(body, {
    transaction: transaction
  });
  return data;
}

library.update = async ({
  id,
  body,
  transaction = null
}) => {
  const data = await Ruangan.update(body, {
    where: {
      id
    },
    transaction: transaction
  });
  return data;
}
