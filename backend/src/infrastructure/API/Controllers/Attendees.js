import { generateError } from '../../../domain/utils/helpers.js'
import AttendeeService from '../../../domain/services/AttendeeService.js'
import { attendeeSchema } from '../schemas/attendeesSchemas.js'

const attendeeService = new AttendeeService()

export const validateNewAttendee = (req, res, next) => {
  const { error } = attendeeSchema.validate(req.body)

  if (error) {
    throw generateError(error.details[0].message, 400)
  }
  next()
}

export const listUsernamesByMeetupController = async (req, res, next) => {
  try {
    const { meetupId } = req.params
    const usernames = await attendeeService.getUsernamesByMeetup(meetupId)

    res.status(200).json(usernames)
  } catch (err) {
    next(err)
  }
}

export const getAttendeeByMeetupAndUserController = async (req, res, next) => {
  try {
    const { meetupId, userId } = req.params
    const attendee = await attendeeService.getAttendeeByMeetupAndUser(
      meetupId,
      userId,
    )

    if (!attendee) {
      return res.status(404).json({ message: 'Attendee not found' })
    }

    res.status(200).json(attendee)
  } catch (err) {
    next(err)
  }
}

export const createAttendeeController = async (req, res, next) => {
  try {
    const { meetupId, userId, username } = req.body
    await attendeeService.createAttendee(meetupId, userId, username)

    res.status(201).json({ message: 'Attendee created successfully.' })
  } catch (error) {
    next(error)
  }
}

export const deleteAttendeeController = async (req, res, next) => {
  try {
    const { meetupId, userId } = req.body
    await attendeeService.deleteAttendee(meetupId, userId)

    res.status(200).json({ message: 'Attendee deleted successfully.' })
  } catch (error) {
    next(error)
  }
}

export const listAttendeesController = async (req, res, next) => {
  try {
    const { meetupId } = req.params
    const attendees = await attendeeService.getAttendeesByMeetup(meetupId)

    res.status(200).json(attendees)
  } catch (err) {
    next(err)
  }
}

export const getAttendeeByIdController = async (req, res, next) => {
  try {
    const { attendeeId } = req.params
    const attendee = await attendeeService.getAttendeeById(attendeeId)

    if (!attendee) {
      res.status(404).json({ message: 'Attendee not found.' })
    } else {
      res.status(200).json(attendee)
    }
  } catch (error) {
    next(error)
  }
}

export const checkAttendeeExistenceController = async (req, res, next) => {
  try {
    const { meetupId, userId } = req.params

    const existingAttendee = await attendeeService.getAttendeeByMeetupAndUser(
      meetupId,
      userId,
    )

    if (existingAttendee) {
      res.status(200).json({ message: 'Attendee already exists.' })
    } else {
      res.status(404).json({ message: 'Attendee not found.' })
    }
  } catch (error) {
    next(error)
  }
}
