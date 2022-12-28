import { Request, Response } from 'express'
import WaifusModel from '../models/list.model'

export const getWaifuById = async (req: Request, res: Response) => {
  try {
    const waifu = await WaifusModel.findById(req.params.id).populate('user')

    res.json(waifu)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      text: 'Something went wrong in waifu route',
      color: 'color--error'
    })
  }
}
