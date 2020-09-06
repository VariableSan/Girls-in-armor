const { Router } = require('express')
const router = Router()
const { getWaifus, removeWaifuById } = require('../controllers/list.controller')

/* /api/list */
router.post('/', getWaifus)

/* /api/list/remove */
router.delete('/remove', removeWaifuById)

module.exports = router