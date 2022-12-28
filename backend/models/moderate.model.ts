import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import { createModel } from '../middleware/mongoose.middle'

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

export default createModel<mongoose.PaginateModel<any>>(
  'Moderate',
  moderateSchema
)
