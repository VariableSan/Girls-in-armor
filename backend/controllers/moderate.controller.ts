import { Request, Response } from 'express'
import WaifusModel from '../models/list.model'
import ModerateModel from '../models/moderate.model'

export const getModerate = async (req: Request, res: Response) => {
  try {
    const moderates = await ModerateModel.paginate({}, req.body)

    res.json(moderates)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      text: 'Something went wrong in moderate route',
      color: 'error'
    })
  }
}

export const addToWaifuList = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    const moderateWaifu = await ModerateModel.findById(id)

    const formattedModerateWaifu = JSON.parse(JSON.stringify(moderateWaifu))
    delete formattedModerateWaifu.password
    delete formattedModerateWaifu.__v

    const waifus = await WaifusModel(formattedModerateWaifu)
    await waifus.save()

    await ModerateModel.findByIdAndRemove(id)

    res.status(200).json({
      text: 'The post is now visible to everyone',
      color: 'success'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      text: 'Something went wrong in moderate route',
      color: 'error'
    })
  }
}

export const removeById = async (req: Request, res: Response) => {
  try {
    await ModerateModel.findByIdAndRemove(req.body.id)

    res.status(200).json({
      text: 'The post is removed',
      color: 'success'
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      text: 'Something went wrong in moderate route',
      color: 'error'
    })
  }
}

export const getById = async (req: Request, res: Response) => {
  try {
    const moderate = await ModerateModel.findById(req.params.id).populate(
      'user'
    )

    const formattedModerate = JSON.parse(JSON.stringify(moderate))
    delete formattedModerate.user.password
    delete formattedModerate.user.permission
    delete formattedModerate.user.__v
    delete formattedModerate.__v

    res.json(formattedModerate)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      text: 'Something went wrong in moderate route',
      color: 'error'
    })
  }
}

export const backToModerate = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    const waifu = await WaifusModel.findById(id)
    const formattedWaifu = JSON.parse(JSON.stringify(waifu))
    const moderate = await new ModerateModel(formattedWaifu)
    await moderate.save()
    await WaifusModel.findByIdAndRemove(id)
    res.status(200).json({
      text: 'Your request has been accepted, the post is being moderated',
      color: 'success'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      text: 'Something went wrong in moderate route',
      color: 'error'
    })
  }
}
