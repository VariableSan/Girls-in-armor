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

/* /moderate/list */
router.post(
  '/list',
  passport.authenticate('jwt', { session: false }),
  getModerate
)

/* /moderate/:id */
router.get('/:id', passport.authenticate('jwt', { session: false }), getById)

/* /moderate/add */
router.post(
  '/add',
  passport.authenticate('jwt', {
    session: false
  }),
  addToWaifuList
)

/* /moderate/remove */
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
