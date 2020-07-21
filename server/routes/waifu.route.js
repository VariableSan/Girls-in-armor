const { Router } = require('express')
const router = Router()
const WaifusModel = require('../models/list.model')

/* /api/waifu/:id */
router.get('/:id', async (req, res) => {
	try {
		const waifu = await WaifusModel.findById(req.params.id)

		res.json(waifu)
	} catch (error) {
		console.log(error)
	}
})

module.exports = router
