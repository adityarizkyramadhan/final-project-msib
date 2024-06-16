const flaverr = require('flaverr');
const repoAuth = require('../repositories/auth');
const { success } = require('../utils/http_res');
const transactionUtil = require('../utils/transaction');

const library = {}
module.exports = library


library.register = async (req, res, next) => {
  let transaction = null
  try {
    transaction = await transactionUtil.Create()
    if (!transaction.status) {
      throw flaverr("E_INTERNAL_SERVER_ERROR", transaction.err)
    }
    const user = await repoAuth.register({
      body: req.body,
      transaction: transaction.data
    })
    await transactionUtil.Commit(transaction.data)
    const token = repoAuth.generateToken(user)
    return success(res, 201, token, 'User created')
  } catch (error) {
    if (transaction) {
      await transactionUtil.Rollback(transaction.data)
    }
    next(error)
  }
}

library.login = async (req, res, next) => {
  try {
    const user = await repoAuth.login({
      body: req.body
    })
    const token = repoAuth.generateToken(user)
    return success(res, 200, token, 'Login success')
  } catch (error) {
    next(error)
  }
}


