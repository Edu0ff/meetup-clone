import OrganizerService from '../../../domain/services/OrganizerService.js'
import { generateError } from '../../../domain/utils/helpers.js'
import MeetupService from '../../../domain/services/MeetupService.js'

const organizerService = new OrganizerService()
const meetupService = new MeetupService()
export const newOrganizerController = async (req, res, next) => {
  try {
    const { user_id, meetup_id } = req.body
    await organizerService.addOrganizer(user_id, meetup_id)

    res.status(200).json({ message: 'Organizer added successfully.' })
  } catch (error) {
    next(error)
  }
}

export const listOrganizersController = async (req, res, next) => {
  try {
    const { meetup_id } = req.params
    const organizers = await organizerService.getOrganizersByMeetup(meetup_id)

    res.status(200).json(organizers)
  } catch (err) {
    next(err)
  }
}

export const deleteOrganizerController = async (req, res, next) => {
  try {
    const { meetup_id, user_id } = req.body
    await organizerService.deleteOrganizer(meetup_id, user_id)

    res.status(200).json({ message: 'Organizer deleted successfully.' })
  } catch (err) {
    next(err)
  }
}

export const getOrganizerByIdController = async (req, res, next) => {
  try {
    const { organizerId } = req.params
    const organizer = await organizerService.getOrganizerById(organizerId)

    if (!organizer) {
      res.status(404).json({ message: 'Organizer not found.' })
    } else {
      res.status(200).json(organizer)
    }
  } catch (error) {
    next(error)
  }
}

export const getOrganizersByMeetupIdController = async (req, res, next) => {
  try {
    const { id } = req.params

    const meetup = await meetupService.getMeetupById(id)
    if (!meetup) {
      return res.status(404).json({ message: 'Meetup not found.' })
    }

    const organizers = await organizerService.getOrganizersByMeetupId(id)

    res.status(200).json(organizers)
  } catch (error) {
    next(error)
  }
}
