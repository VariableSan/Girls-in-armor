const WaifusModel = require('../models/list.model')

module.exports.addWaifu = async (req, res) => {
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
}