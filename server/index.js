const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

/*==================== SCHEMAS START====================*/
const waifusSchema = new mongoose.Schema({
	name: {
		required: true,
		type: String
	},
	imgUrl: {
		required: true,
		type: String
	},
	description: String
})
/*==================== SCHEMAS END====================*/

/*==================== MODELS START====================*/
let WaifusModel = {}
if (!modelAlreadyDeclared('Waifus')) {
	WaifusModel = mongoose.model('Waifus', waifusSchema)
}
else {
	WaifusModel = mongoose.model('Waifus')
}
/*==================== MODELS END====================*/

/*==================== MONGO SERVER START====================*/
startMongo()
/*==================== MONGO SERVER END====================*/

/*==================== EXPRESS CONFIGS START====================*/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
/*==================== EXPRESS CONFIGS END====================*/

/*==================== ROUTES START====================*/
	/*==================== list route START====================*/
	app.get('/list', async (req, res) => {
		const waifus = await WaifusModel.find()

		res.json(waifus)
	})
	/*==================== list route END====================*/

	/*==================== add route START====================*/
	app.post('/add', async (req, res) => {
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
	})
	/*==================== add route END====================*/
/*==================== ROUTES END====================*/

module.exports = {
	path: '/api',
	handler: app
}

async function startMongo() {
	try {
		const dbURL = 'mongodb+srv://JudgementHC:4KZkQLq&C$m@webfolio-qilbf.mongodb.net/girls-in-armor?retryWrites=true&w=majority'
		await mongoose.connect(dbURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
	} catch (error) {
		console.log(error)
	}
}

function modelAlreadyDeclared(modelName) {
	try {
		mongoose.model(modelName) // it throws an error if the model is still not defined
		return true
	} catch (e) {
		return false
	}
}