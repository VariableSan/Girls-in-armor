const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const keys = require('../keys')
const User = require('../models/user.model')

module.exports.login = async (req, res) => {
	const { login, password } = req.body
	
	const user = await User.findOne({ login })

	if (user) {
		const isPasswordCorrect = bcrypt.compareSync(password, user.password)

		if (isPasswordCorrect) {
			const token = jwt.sign({
				login: user.login,
				userId: user._id,
				permission: user.permission
			}, keys.JWT, { expiresIn: 60 * 60 })

			res.json({
				token,
				user: user._id,
				permission: user.permission,
				text: 'You are successfully logged in',
				color: 'color--success'
			})
		}
		else {
			userUndefined(res)
		}
	}
	else {
		userUndefined(res)
	}
}

module.exports.createUser = async (req, res) => {
	const { login, password, email } = req.body
	
	const isUserExist = await User.findOne({ login })

	if (isUserExist) {
		res.status(409).json({
			text: 'This login already exists',
			color: 'color--error'
		})
	}
	else {
		const salt = bcrypt.genSaltSync(10)
		const cryptPassword = bcrypt.hashSync(password, salt)

		const newUser = new User({
			login,
			password: cryptPassword,
			email
		})

		await newUser.save()

		res.status(201).json({
			text: 'A new user was created',
			color: 'color--success'
		})
	}
}

module.exports.logout = async (req, res) => {
	
}

function userUndefined(res) {
	res.json({
		text: 'User is undefined',
		color: 'color--error'
	})
}
