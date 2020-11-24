const { Schema } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { createModel } = require('../middleware/mongoose.middle')

const moderateSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  imgUrl: {
    required: true,
    type: String
  },
  description: String,
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

moderateSchema.plugin(mongoosePaginate)

module.exports = createModel('Moderate', moderateSchema)
