const { Router } = require('express')
const router = Router()
const WaifusModel = require('../models/list.model')

/* /api/add */
router.post('/', async (req, res) => {
	const waifus = new WaifusModel({
		name: req.body.name,
		imgUrl: req.body.imgUrl,
		description: req.body.description
	})

	try {
		await waifus.save()
		res.sendStatus(200)
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

module.exports = router
