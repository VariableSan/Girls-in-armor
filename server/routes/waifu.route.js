const { Router } = require('express')
const router = Router()
const { getWaifuById } = require('../controllers/waifu.controller')

/* /api/waifu/:id */
router.get('/:id', getWaifuById)

module.exports = router
