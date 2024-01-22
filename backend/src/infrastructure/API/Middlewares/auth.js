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

    if (req.userId !== Number(req.params.id)) {
      console.log(req.userId, req.params.id)
      throw generateError(
        'No autorizado: no tienes permiso para realizar esta acción.',
        401,
      )
    }

    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw generateError('Token JWT mal formado', 401)
    }
    console.error(error)
    next(error)
  }
}
