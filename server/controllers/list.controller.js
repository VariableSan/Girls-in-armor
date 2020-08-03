const WaifusModel = require('../models/list.model')

module.exports.getWaifus = async (req, res) => {
	try {
		const waifus = await WaifusModel.find()

		res.json(waifus)
	}
	catch (error) {
		console.log(error)	
	}
}

module.exports.getLength = async (req, res) => {
	try {
		const waifusLength = await WaifusModel.countDocuments()
		
		res.json(waifusLength)
	} catch (error) {
		console.log(error)
	}
}