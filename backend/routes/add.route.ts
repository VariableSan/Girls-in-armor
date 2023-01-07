import { Request, Response, Router } from 'express'
import passport from 'passport'
import { addWaifu } from '../controllers/add.controller'
import multer from 'multer'

const router = Router()

/* /add */
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  multer().single('image'),
  (req: Request, res: Response) => {
    addWaifu(req, res)
  }
)

export default router
