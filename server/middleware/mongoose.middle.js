const { model, connect } = require('mongoose')

function modelAlreadyDeclared(modelName) {
	try {
		model(modelName) // it throws an error if the model is still not defined
		return true
	} catch (e) {
		return false
	}
}

function createModel(modelName, modelSchema) {
	let instance = {}

	if (!modelAlreadyDeclared(modelName)) {
		instance = model(modelName, modelSchema)
	} else {
		instance = model(modelName)
	}

	return instance
}

async function startMongo() {
	try {
		const { mongoURI } = require('../keys')
		await connect(mongoURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	createModel,
	startMongo
}
