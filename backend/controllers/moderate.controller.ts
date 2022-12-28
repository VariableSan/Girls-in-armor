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
      color: 'color--error'
    })
  }
}

export const addToWaifuList = async (req: Request, res: Response) => {
  try {
    const { id } = req.body
    delete req.body.id

    const waifus = await WaifusModel(req.body)
    await waifus.save()

    await ModerateModel.findByIdAndRemove(id)

    res.status(200).json({
      text: 'The post is now visible to everyone',
      color: 'color--success'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      text: 'Something went wrong in moderate route',
      color: 'color--error'
    })
  }
}

export const removeById = async (req: Request, res: Response) => {
  try {
    await ModerateModel.findByIdAndRemove(req.body.id)

    res.status(200).json({
      text: 'The post is removed',
      color: 'color--success'
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      text: 'Something went wrong in moderate route',
      color: 'color--error'
    })
  }
}

export const getById = async (req: Request, res: Response) => {
  try {
    const moderate = await ModerateModel.findById(req.params.id).populate(
      'user'
    )

    res.json(moderate)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      text: 'Something went wrong in moderate route',
      color: 'color--error'
    })
  }
}
