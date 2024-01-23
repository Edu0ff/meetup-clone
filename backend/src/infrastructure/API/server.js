import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import expressFileUpload from 'express-fileupload'
import { userRoutes } from './Routes/users.js'
import { meetupsRoutes } from './Routes/meetups.js'
import { attendeesRoutes } from './Routes/attendees.js'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(expressFileUpload())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('./uploads'))

// RUTAS
app.use('/', userRoutes)
app.use('/', meetupsRoutes)
app.use('/', attendeesRoutes)

// Middleware para el error 404
app.use((req, res) => {
  res.status(404).send({
    status: 'Error',
    message: 'Página no encontrada',
  })
})

// Middleware de gestión de errores personalizados
app.use((error, req, res, next) => {
  console.error(error)

  res.status(error.httpStatus || 500).send({
    status: 'Error',
    message: error.message,
  })
})

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
