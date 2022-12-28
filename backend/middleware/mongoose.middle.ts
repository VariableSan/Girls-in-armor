import { connect, model, Model, Schema } from 'mongoose'

const modelAlreadyDeclared = (modelName: string): boolean => {
  try {
    model(modelName) // it throws an error if the model is still not defined
    return true
  } catch (e) {
    return false
  }
}

export const createModel = <T extends Model<any>>(
  modelName: string,
  modelSchema: Schema
): T => {
  let instance

  if (!modelAlreadyDeclared(modelName)) {
    instance = model(modelName, modelSchema)
  } else {
    instance = model(modelName)
  }

  return instance
}

export const startMongo = async (): Promise<void> => {
  try {
    await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}
