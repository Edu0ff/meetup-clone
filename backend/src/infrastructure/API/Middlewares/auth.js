import jwt from 'jsonwebtoken'
import { generateError } from '../../../domain/utils/helpers.js'
export const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      throw generateError(
        'No autorizado. Debes ser un usuario registrado para realizar esta acción.',
        401,
      )
    }

    const token = jwt.verify(
      authorization.replace('Bearer ', ''),
      process.env.JWT_SECRET,
    )

    req.userId = token.userId
    req.userEmail = token.userEmail
    req.Name = token.Name
    req.lastName = token.lastName
    req.userUsername = token.userUsername

    next()
  } catch (error) {
    console.error(error)

    if (error instanceof jwt.JsonWebTokenError) {
      throw generateError('Token JWT mal formado', 401)
    }

    next(error)
  }
}
