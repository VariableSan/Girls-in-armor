import { Router } from 'express'
import { getWaifus, removeWaifuById } from '../controllers/list.controller'

const router = Router()

/* /api/list */
router.post('/', getWaifus)

/* /api/list/remove */
router.delete('/remove', removeWaifuById)

export default router
