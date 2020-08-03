const WaifusModel = require('../models/list.model')

module.exports.getWaifuById = async (req, res) => {
	try {
		const waifu = await WaifusModel.findById(req.params.id)
		
		res.json(waifu)
	} catch (error) {
		console.log(error)
	}
}