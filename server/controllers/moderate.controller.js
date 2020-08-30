const ModerateModel = require('../models/moderate.model')
const WaifusModel = require('../models/list.model')

module.exports.getModerate = async (req, res) => {
	try {
		const moderates = await ModerateModel.find()

		res.json(moderates)
	} catch (error) {
		console.error(error)
	}
}

module.exports.getLength = async (req, res) => {
	try {
		const moderatesLength = await ModerateModel.countDocuments()

		res.json(moderatesLength)
	} catch (error) {
		console.error(error)
	}
}

module.exports.addToWaifuList = async(req, res) => {
	try {
		const waifus = await WaifusModel(req.body)
		await waifus.save()

		await ModerateModel().deleteOne({_id: req.body.id})

		res.sendStatus(200).json({
			text: 'The post is now visible to everyone',
			color: 'color--success'
		})
	} 
	catch (error) {
		console.error(error)
		res.sendStatus(500).json({
			text: 'Something went wrong in moderate route',
			color: 'color--error'
		})
	}
}

module.exports.removeById = async(req, res) => {
	try {
		await ModerateModel().deleteOne({_id: req.body.id})

		res.sendStatus(200).json({
			text: 'The post is removed',
			color: 'color--success'
		})
	} 
	catch (error) {
		console.error(error)
		res.sendStatus(500).json({
			text: 'Something went wrong in moderate route',
			color: 'color--error'
		})
	}
}

module.exports.getById = async (req, res) => {
	try {
		const moderate = await ModerateModel.findById(req.params.id).populate('user')

		res.json(moderate)
	} 
	catch (error) {
		console.error(error)
		res.sendStatus(500).json({
			text: 'Something went wrong in moderate route',
			color: 'color--error'
		})
	}
}