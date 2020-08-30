const WaifusModel = require('../models/list.model')

module.exports.getWaifuById = async (req, res) => {
	try {
		const waifu = await WaifusModel.findById(req.params.id).populate('user')
		
		res.json(waifu)

	} catch (error) {
		console.error(error)
		
		res.sendStatus(500).json({
			text: 'Something went wrong in waifu route',
			color: 'color--error'
		})
	}
}