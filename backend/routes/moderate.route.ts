import { Router } from 'express'
import passport from 'passport'
import {
  getModerate,
  getById,
  addToWaifuList,
  removeById,
  backToModerate
} from '../controllers/moderate.controller'

const router = Router()

/* /api/moderate/list */
router.post(
  '/list',
  passport.authenticate('jwt', { session: false }),
  getModerate
)

/* /api/moderate/:id */
router.get('/:id', passport.authenticate('jwt', { session: false }), getById)

/* /api/moderate/add */
router.post(
  '/add',
  passport.authenticate('jwt', {
    session: false
  }),
  addToWaifuList
)

/* /api/moderate/remove */
router.delete(
  '/remove',
  passport.authenticate('jwt', {
    session: false
  }),
  removeById
)

router.post(
  '/back-to-moderate',
  passport.authenticate('jwt', { session: false }),
  backToModerate
)

export default router
