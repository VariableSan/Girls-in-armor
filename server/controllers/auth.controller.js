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
				userId: user._id
			}, keys.JWT, { expiresIn: 60 * 60 })

			res.json({ token })
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
	const { login, password } = req.body
	
	const isUserExist = await User.findOne({ login })

	if (isUserExist) {
		res.status(409).json({ message: 'This login already exists' })
	}
	else {
		const salt = bcrypt.genSaltSync(10)
		const cryptPassword = bcrypt.hashSync(password, salt)

		const newUser = new User({
			login,
			password: cryptPassword
		})

		await newUser.save()

		res.status(201).json({
			message: 'A new user was created',
			newUser
		})
	}
}

function userUndefined(res) {
	res.status(404).json({ message: 'User is undefined' })
}
