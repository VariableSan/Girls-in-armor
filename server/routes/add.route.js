const passport = require('passport')
const { Router } = require('express')
const router = Router()
const { addWaifu } = require('../controllers/add.controller')

/* /api/add */
router.post('/', passport.authenticate('jwt', { session: false }), addWaifu)

module.exports = router
