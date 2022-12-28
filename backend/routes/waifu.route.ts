import { Router } from 'express'
import { getWaifuById } from '../controllers/waifu.controller'

const router = Router()

/* /api/waifu/:id */
router.get('/:id', getWaifuById)

export default router
