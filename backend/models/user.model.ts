import { Schema } from 'mongoose'
import { createModel } from '../middleware/mongoose.middle'

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
  },

  permission: {
    type: Boolean,
    default: false
  }
})

export default createModel('User', userSchema)
