const { Schema } = require('mongoose')
const { createModel } = require('../middleware/mongoose.middle')

const waifusSchema = new Schema({
	name: {
		required: true,
		type: String
	},
	imgUrl: {
		required: true,
		type: String
	},
	description: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
})

module.exports = createModel('Waifus', waifusSchema)