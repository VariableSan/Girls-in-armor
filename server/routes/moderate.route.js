const passport = require('passport')
const { Router } = require('express')
const router = Router()
const ModerateCtr = require('../controllers/moderate.controller')

/* /api/moderate/list */
router.get(
	'/list', 
	passport.authenticate('jwt', { session: false }),
	ModerateCtr.getModerate
)

/* /api/moderate/length */
router.get(
	'/length',
	passport.authenticate('jwt', { session: false }),
	ModerateCtr.getLength
)

/* /api/moderate/:id */
router.get(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	ModerateCtr.getById
)

/* /api/moderate/add */
router.post(
	'/add',
	passport.authenticate('jwt', {
		session: false
	}),
	ModerateCtr.addToWaifuList
)

/* /api/moderate/remove */
router.delete(
	'/remove',
	passport.authenticate('jwt', {
		session: false
	}),
	ModerateCtr.removeById
)

module.exports = router
