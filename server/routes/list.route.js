const { Router } = require('express')
const router = Router()
const WaifusModel = require('../models/list.model')

/* /api/list */
router.get('/', async (req, res) => {
	const waifus = await WaifusModel.find()

	res.json(waifus)
})

/* /api/list/waifuslength */
router.get('/waifuslength', async (req, res) => {
	try {
		const waifusLength = await WaifusModel.countDocuments()

		res.json(waifusLength)
	} catch (error) {
		console.log(error)
	}
})

module.exports = router