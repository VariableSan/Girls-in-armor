const { Router } = require('express')
const router = Router()
const { getWaifus, getLength } = require('../controllers/list.controller')

/* /api/list */
router.post('/', getWaifus)

module.exports = router