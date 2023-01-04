import { Request, Response } from 'express'
import ModerateWaifusModel from '../models/moderate.model'

export const addWaifu = async (req: Request, res: Response) => {
  try {
    const waifus = new ModerateWaifusModel(req.body)

    await waifus.save()
    res.status(200).json({
      text: 'Your request has been accepted, the post is being moderated',
      color: 'success'
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      text: 'Something went wrong in add route',
      color: 'error'
    })
  }
}
