import { Router } from 'express'
import { createUser, login, logout } from '../controllers/auth.controller'

const router = Router()

/* /api/auth/login */
router.post('/login', login)

/* /api/auth/create */
router.post('/create', createUser)

/* /api/auth/logout */
router.get('/logout', logout)

export default router
