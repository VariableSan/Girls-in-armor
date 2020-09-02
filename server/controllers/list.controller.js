const WaifusModel = require('../models/list.model')
const { defaultError } = require('../middleware/status-sender')

module.exports.getWaifus = async (req, res) => {
	try {
		const waifus = await WaifusModel.paginate({}, req.body)

		res.json(waifus)
	}
	catch (error) {
		console.error(error)

		defaultError(res, 'list')
	}
}