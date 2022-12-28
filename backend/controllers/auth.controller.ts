import { compareSync, genSaltSync, hashSync } from 'bcrypt-nodejs'
import { RequestHandler } from 'express'
import { sign } from 'jsonwebtoken'
import User from '../models/user.model'
import { EColor } from '../utils/enums/Color.enum'
import { TLogin } from '../utils/types/Login.type'
import { TMessage } from '../utils/types/Message.type'

export const login: RequestHandler = async (req, res) => {
  const { login, password } = req.body as TLogin

  const user = await User.findOne({ login })

  if (user) {
    const isPasswordCorrect = compareSync(password, user.password)

    if (isPasswordCorrect) {
      const token = sign(
        {
          login: user.login,
          userId: user._id,
          permission: user.role
        },
        process.env.JWT,
        { expiresIn: 60 * 60 }
      )

      return res
        .header('Authorization', `Bearer ${token}`)
        .status(200)
        .json({
          text: 'You are successfully logged in',
          color: 'success'
        } as TMessage)
    }
  }

  res.status(500).json({
    text: 'User is undefined',
    color: 'error'
  } as TMessage)
}

export const createUser: RequestHandler = async (req, res) => {
  const { login, password, email } = req.body

  const isUserExist = await User.findOne({ login })

  if (isUserExist) {
    return res.status(409).send({
      text: 'User already exists',
      color: EColor.WARNING
    } as TMessage)
  }

  const salt = genSaltSync(10)
  const cryptPassword = hashSync(password, salt)

  const newUser = new User({
    login,
    password: cryptPassword,
    email
  })

  await newUser.save()

  res.status(201).json({
    text: 'A new user was created',
    color: EColor.SUCCESS
  } as TMessage)
}

export const logout: RequestHandler = (req, res) => {}
