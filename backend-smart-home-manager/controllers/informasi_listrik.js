const informasiListrikRepo = require('../repositories/informasi_listrik');
const { success } = require('../utils/http_res');
const transactionUtil = require('../utils/transaction');

const library = {}
module.exports = library

library.create = async (req, res, next) => {
  let transaction = null
  try {
    transaction = await transactionUtil.Create()
    if (!transaction.status) {
      throw flaverr("E_INTERNAL_SERVER_ERROR", transaction.err)
    }
    req.body.user_id = req.user.id
    const informasiListrik = await informasiListrikRepo.create({
      body: req.body,
      transaction: transaction.data
    })
    await transactionUtil.Commit(transaction.data)
    return success(res, 201, informasiListrik, 'Informasi listrik created')
  } catch (error) {
    if (transaction) {
      await transactionUtil.Rollback(transaction.data)
    }
    next(error)
  }
}

library.checkIsComplete = async (req, res, next) => {
  try {
    const isComplete = await informasiListrikRepo.checkIsComplete(req.user.id)
    return success(res, 200, { is_complete: isComplete }, 'Check is complete')
  } catch (error) {
    next(error)
  }
}
