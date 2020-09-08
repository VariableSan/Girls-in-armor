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
		const { MONGO_URI } = require('../keys')
		await connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		})
	} catch (error) {
		console.error(error)
	}
}

module.exports = {
	createModel,
	startMongo
}
