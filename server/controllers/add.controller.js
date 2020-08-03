const WaifusModel = require('../models/list.model')

module.exports.addWaifu = async (req, res) => {
	const { name, imgUrl, description, user } = req.body
	
	const waifus = new WaifusModel({
		name,
		imgUrl,
		description,
		user
	})

	try {
		await waifus.save()
		res.sendStatus(200).json({ text: 'Your post is saved' })
	}
	catch (error) {
		console.log(error)
		res.sendStatus(500).json({
			text: 'Something went wrong in add route'
		})
	}
}