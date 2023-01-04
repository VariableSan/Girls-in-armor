import { Response } from 'express'

export const defaultError = (res: Response, route: string) => {
  res.status(500).json({
    text: `Something went wrong in ${route} route`,
    color: 'error'
  })
}
