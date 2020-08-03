const { Router } = require('express')
const router = Router()
const { addWaifu } = require('../controllers/add.controller')

/* /api/add */
router.post('/', addWaifu)

module.exports = router
