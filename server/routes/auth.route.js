const { Router } = require('express')
const router = Router()
const { login, createUser, logout } = require('../controllers/auth.controller')

/* /api/auth/login */
router.post('/login', login)

/* /api/auth/create */
router.post('/create', createUser)

/* /api/auth/logout */
router.get('/logout', logout)

module.exports = router
