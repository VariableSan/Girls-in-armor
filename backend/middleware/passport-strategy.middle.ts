import { Strategy, ExtractJwt } from 'passport-jwt'
import User from '../models/user.model'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT
}

export const strategy = new Strategy(options, async (payload, done) => {
  try {
    const userById = await User.findById(payload.userId).select('id')

    if (userById) {
      done(null, userById)
    } else {
      done(null, false)
    }
  } catch (error) {
    console.error(error)
  }
})
