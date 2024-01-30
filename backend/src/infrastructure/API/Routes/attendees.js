import express from 'express'
import {
  newAttendeeController,
  listAttendeesController,
  getAttendeeByIdController,
  listUsernamesByMeetupController,
} from '../Controllers/Attendees.js'
import { authUser } from '../Middlewares/auth.js'

const attendeesRoutes = express.Router()

attendeesRoutes.post('/attendees', authUser, newAttendeeController)
attendeesRoutes.get(
  '/attendees/:attendeeId',
  authUser,
  getAttendeeByIdController,
)
attendeesRoutes.get('/attendees/:meetupId/list', listAttendeesController)
attendeesRoutes.get(
  '/attendees/:meetupId/usernames',
  authUser,
  listUsernamesByMeetupController,
)

export { attendeesRoutes }
