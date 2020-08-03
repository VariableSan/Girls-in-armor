const { Router } = require('express')
const router = Router()
const { getWaifus, getLength } = require('../controllers/list.controller')

/* /api/list */
router.get('/', getWaifus)

/* /api/list/waifuslength */
router.get('/waifuslength', getLength)

module.exports = router