import { Request, Response } from 'express'
import { decode } from 'jsonwebtoken'
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
  const { authorization } = req.headers

  const token = decode(authorization.replace('Bearer ', '')) as Record<
    string,
    string
  >

  try {
    const waifu = await WaifusModel.findById(req.body.id)
    const waifuUserId = JSON.parse(JSON.stringify(waifu.user))
    if (token.permission || waifuUserId === token._id) {
      await WaifusModel.findByIdAndRemove(req.body.id)
    } else {
      return res.status(500).json({
        text: 'You do not have permission',
        color: 'warning'
      })
    }
    res.status(200).json({
      text: 'The post was successfully deleted',
      color: 'success'
    })
  } catch (e) {
    console.error(e)

    defaultError(res, 'list')
  }
}
