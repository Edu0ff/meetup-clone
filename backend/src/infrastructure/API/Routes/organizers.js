import express from 'express'
import {
  newOrganizerController,
  listOrganizersController,
  getOrganizerByIdController,
  deleteOrganizerController,
} from '../Controllers/Organizers.js'
import { authUser } from '../Middlewares/auth.js'

const meetupsRoutes = express.Router()

const organizersRoutes = express.Router()

organizersRoutes.post('/organizers', newOrganizerController)
organizersRoutes.get('/organizers/:meetupId/list', listOrganizersController)
organizersRoutes.get('/organizers/:organizerId', getOrganizerByIdController)
organizersRoutes.delete('/organizers', authUser, deleteOrganizerController)

export { organizersRoutes }
