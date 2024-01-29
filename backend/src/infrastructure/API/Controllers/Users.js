/* eslint-disable no-unused-vars */
import { generateError } from '../../../domain/utils/helpers.js'
import UserService from '../../../domain/services/UserService.js'
import { usersSchemas, loginSchema } from '../schemas/usersSchemas.js'
import { v4 as uuidv4 } from 'uuid'

const userService = new UserService()

export const generateActivationToken = () => {
  return uuidv4()
}
export const validateNewUser = (req, res, next) => {
  const { error } = usersSchemas.validate(req.body)

  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  next()
}

export const newUserController = async (req, res, next) => {
  try {
    const { username, email, password, bio, meetups_attended, avatar } =
      req.body
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: '"password" length must be at least 8 characters long' })
    }

    const token = generateActivationToken()
    const userId = await userService.createUser({
      username,
      email,
      password,
      bio,
      meetups_attended,
      avatar,
    })
    res.status(200).json({ message: 'User registered successfully.', userId })
  } catch (err) {
    next(err)
  }
}

export const loginController = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body)

    if (error) {
      throw generateError(error.details[0].message, 404)
    }

    const { email, password } = req.body
    const token = await userService.login(email, password)

    if (!token) {
      throw generateError('Invalid email or password.', 401)
    }

    res.status(200).json({ token })
  } catch (err) {
    next(err)
  }
}
export const updateUserController = async (req, res, next) => {
  const userId = req.params.id

  try {
    if (req.userId !== Number(userId)) {
      throw generateError('No tienes permiso para actualizar este perfil.', 403)
    }

    const { username, bio, email, password, avatar } = req.body

    const updatedUser = await userService.updateUser(userId, {
      username,
      bio,
      email,
      password,
      avatar,
    })

    res
      .status(200)
      .json({ message: 'Perfil actualizado correctamente', data: updatedUser })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

export const getUserController = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}
