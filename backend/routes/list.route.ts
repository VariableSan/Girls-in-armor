import { Router } from 'express'
import passport from 'passport'
import { getWaifus, removeWaifuById } from '../controllers/list.controller'

const router = Router()

/* /api/list */
router.post('/', getWaifus)

/* /api/list/remove */
router.delete(
  '/remove',
  passport.authenticate('jwt', { session: false }),
  removeWaifuById
)

export default router
