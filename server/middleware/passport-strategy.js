const { Strategy, ExtractJwt } = require('passport-jwt')
const { model } = require('mongoose')
const keys = require('../keys')
const User = model('User')

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: keys.JWT
}

module.exports = new Strategy(options, async (payload, done) => {
	try {
		const userById = await User.findById(payload.userId).select('id')

		if (userById) {
			done(null, userById)
		}
		else {
			done(null, false)
		}
	}
	catch (err) {
		console.error(err)
	}
})