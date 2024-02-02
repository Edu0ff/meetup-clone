import { MeetupRepository } from '../../domain/repository/MeetupRepository'

export class MeetupRepositoryMock extends MeetupRepository {
  constructor() {
    super()
    this.meetups = []
  }

  async createMeetup(meetupData) {
    if (
      !meetupData.title ||
      !meetupData.picture ||
      !meetupData.theme ||
      !meetupData.location ||
      !meetupData.date ||
      !meetupData.time ||
      !meetupData.attendees_count
    ) {
      throw new Error('Please provide all required meetup information.')
    }

    const newMeetup = { id: this.meetups.length + 1, ...meetupData }
    this.meetups.push(newMeetup)
    return newMeetup.id
  }

  async listMeetups() {
    return this.meetups
  }

  async getMeetupsById(id) {
    const meetup = this.meetups.find((meetup) => meetup.id === id)
    if (!meetup) {
      throw new Error(`Meetup with ID: ${id} not found`)
    }
    return meetup
  }

  async updateMeetup(id, meetupData) {
    const meetupIndex = this.meetups.findIndex((meetup) => meetup.id === id)

    if (meetupIndex === -1) {
      throw new Error(`Meetup with ID: ${id} not found`)
    }

    this.meetups[meetupIndex] = {
      ...this.meetups[meetupIndex],
      ...meetupData,
    }
  }

  async deleteMeetupById(id) {
    const meetupIndex = this.meetups.findIndex((meetup) => meetup.id === id)

    if (meetupIndex === -1) {
      throw new Error(`Meetup with ID: ${id} not found`)
    }

    this.meetups.splice(meetupIndex, 1)
  }
}
