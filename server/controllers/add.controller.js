const WaifusModel = require('../models/list.model')

module.exports.addWaifu = async (req, res) => {
	const { name, imgUrl, description, user } = req.body
	
	const waifus = new WaifusModel(req.body)

	try {
		await waifus.save()
		res.sendStatus(200).json({
			text: 'Character is added',
			color: 'color--success'
		})
	}
	catch (error) {
		console.error(error)
		res.sendStatus(500).json({
			text: 'Something went wrong in add route',
			color: 'color--error'
		})
	}
}