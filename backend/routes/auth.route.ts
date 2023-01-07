import { Router } from 'express'
import { createUser, login, logout } from '../controllers/auth.controller'

const router = Router()

/* /auth/login */
router.post('/login', login)

/* /auth/create */
router.post('/create', createUser)

/* /auth/logout */
router.get('/logout', logout)

export default router
