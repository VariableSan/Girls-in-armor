import { Request, Response } from 'express'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import ModerateWaifusModel from '../models/moderate.model'
import { firebaseApp } from '../services/firebase'
import { v4 } from 'uuid'

export const addWaifu = async (req: Request, res: Response) => {
  try {
    const fileExt = req.file.originalname.slice(
      req.file.originalname.lastIndexOf('.')
    )

    const storageRef = ref(firebaseApp.storage, `userImages/${v4()}${fileExt}`)
    await uploadBytes(storageRef, req.file.buffer)
    const imgUrl = await getDownloadURL(storageRef)

    const waifus = new ModerateWaifusModel({
      ...req.body,
      imgUrl
    })
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
