import { MeetupRepository } from '../repository/MeetupRepository.js'
import UserService from './UserService.js'
class MeetupService {
  constructor() {
    this.meetupRepository = new MeetupRepository()
    this.userService = new UserService()
  }

  async createMeetup({
    title,
    description,
    picture,
    theme,
    location,
    address,
    date,
    time,
    organizer_id,
  }) {
    if (
      !title ||
      !description ||
      !picture ||
      !theme ||
      !location ||
      !address ||
      !date ||
      !time ||
      !organizer_id
    ) {
      throw new Error('Please provide all required meetup information.')
    }

    const organizerExists = await this.userService.userExists(organizer_id)

    if (!organizerExists) {
      throw new Error('Organizer not found.')
    }

    const meetupData = {
      title,
      description,
      picture,
      theme,
      location,
      address,
      date,
      time,
      attendees_count: 0,
      organizer_id,
    }

    const meetupId = await this.meetupRepository.createMeetup(meetupData)

    return meetupId
  }

  async listMeetups() {
    return this.meetupRepository.listMeetups()
  }

  async updateMeetupById(id, meetupData) {
    const meetup = await this.meetupRepository.getMeetupsById(id)

    const updatedMeetup = {
      id: meetup.id,
      title: meetup.title,
      description: meetup.description,
      picture: meetup.picture,
      theme: meetup.theme,
      location: meetup.location,
      address: meetup.address,
      date: meetup.date,
      time: meetup.time,
      attendees_count: meetup.attendees_count,
      organizer_id: meetup.organizer_id,
      created_at: meetup.created_at,
      updated_at: meetup.updated_at,
      ...meetupData,
    }

    await this.meetupRepository.updateMeetup(id, updatedMeetup)

    return updatedMeetup
  }

  async deleteMeetupById(id) {
    return this.meetupRepository.deleteMeetupById(id)
  }

  async getMeetupById(id) {
    const meetup = await this.meetupRepository.getMeetupsById(id)
    if (!meetup) {
      throw new Error(`The meetup with ID: ${id} not found`)
    }
    return meetup
  }
}

export default MeetupService
