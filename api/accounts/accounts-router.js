const router = require('express').Router()
const Accounts = require('./accounts-model');

const { checkAccountPayload, 
        checkAccountNameUnique,
        checkAccountId
} = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  try {
    const data = await Accounts.getAll()
    res.json(data)
  }
  catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id)
    res.json(account)
  }
  catch (err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, async (req, res, next) => {
  try {
    const data = await Accounts.create(req.body)
    res.json(data)
  }
  catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountId,  async (req, res, next) => {
  try {
    const data = await Accounts.update(req.params.id, req.body)
    res.json(data)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const data = await Accounts.remove(req.params.id)
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).json({ message: err.message, stack: err.stack })
})

module.exports = router;
