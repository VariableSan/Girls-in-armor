const { Router } = require('express')
const router = Router()
const { login, createUser } = require('../controllers/auth.controller')

/* /api/auth/login */
router.post('/login', login)

/* /api/auth/create */
router.post('/create', createUser)

module.exports = router
