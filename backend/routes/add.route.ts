import { Request, Response, Router } from 'express'
import passport from 'passport'
import { addWaifu } from '../controllers/add.controller'

const router = Router()

/* /api/add */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response) => {
    addWaifu(req, res)
  }
)

export default router
