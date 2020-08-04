const { Schema } = require('mongoose')
const { createModel } = require('../middleware/mongoose.middle')

const userSchema = new Schema({
	login: {
		type: String,
		required: true,
		unique: true
	},

	password: {
		type: String,
		required: true,
		minlength: 6
	},

	email: {
		type: String,
		required: true
	}
})

module.exports = createModel('User', userSchema)