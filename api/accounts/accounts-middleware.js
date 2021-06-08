const Accounts = require('./accounts-model');


exports.checkAccountPayload = (req, res, next) => {
  const { name } = req.body;
  const { budget } = req.body;
  if (
    !name || !budget
  ) {
    next({
      message: 'name and budget are required'
    })
  } else if (typeof name !== 'string') {
    next({
      message: 'name of account must be a string'
    })
  } else if (name.trim().length <= 2 || name.trim().length > 100) {
    next({
      message: 'name of account must be between 3 and 100'
    })
  } else if (typeof budget !== 'number') {
    next({
      message: 'budget of account must be a number'
    })
  } else if (budget < 0 || budget > 1000000) {
    next({
      message: 'budget of account is too large or too small'
    })
  } else {
    req.account = {name: name.trim(), budget: budget.trim()}
    next()
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = (req, res, next) => {
  Accounts.getById(req.params.id)
    .then(account => {
      if (!account) {
        res.status(404).json({
          message: 'account not found'
        })
      }
      else {
        next()
      }
    })
}
