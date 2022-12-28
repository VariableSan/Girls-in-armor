import { Request, Response } from 'express'
import { defaultError } from '../middleware/status-sender'
import WaifusModel from '../models/list.model'

export const getWaifus = async (req, res) => {
  try {
    const waifus = await WaifusModel.paginate({}, req.body)

    res.json(waifus)
  } catch (error) {
    console.error(error)

    defaultError(res, 'list')
  }
}

export const removeWaifuById = async (req: Request, res: Response) => {
  try {
    await WaifusModel.findByIdAndRemove(req.body.id)

    res.status(200).json({
      text: 'The post was successfully deleted',
      color: 'color--success'
    })
  } catch (e) {
    console.error(e)

    defaultError(res, 'list')
  }
}
