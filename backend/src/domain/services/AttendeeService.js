import { AttendeeRepository } from '../repository/AttendeeRepository.js'

class AttendeeService {
  constructor() {
    this.attendeeRepository = new AttendeeRepository()
  }

  async addAttendee(meetupId, userId) {
    try {
      const existingAttendee =
        await this.attendeeRepository.getAttendeeByMeetupAndUser(
          meetupId,
          userId,
        )

      if (existingAttendee) {
        await this.attendeeRepository.deleteAttendee(meetupId, userId)
      } else {
        await this.attendeeRepository.createAttendee(meetupId, userId, true)
      }

      await this.updateCounts(meetupId, userId)
    } catch (error) {
      throw error
    }
  }

  async getAttendeesByMeetup(meetupId) {
    return this.attendeeRepository.getAttendeesByMeetup(meetupId)
  }

  async getAttendeeById(attendeeId) {
    return this.attendeeRepository.getAttendeeById(attendeeId)
  }

  async toggleAttendee(meetupId, userId) {
    try {
      const existingAttendee =
        await this.attendeeRepository.getAttendeeByMeetupAndUser(
          meetupId,
          userId,
        )

      if (existingAttendee) {
        const newWillAttend = !existingAttendee.willAttend
        await this.attendeeRepository.updateAttendee(
          meetupId,
          userId,
          newWillAttend,
        )
      } else {
        await this.attendeeRepository.createAttendee(meetupId, userId, true)
      }

      await this.updateCounts(meetupId, userId)
    } catch (error) {
      throw error
    }
  }

  async getTotalAttendeesCount() {
    return this.attendeeRepository.getTotalAttendeesCount()
  }

  async updateCounts(meetupId, userId) {
    const totalMeetupAttendees =
      await this.attendeeRepository.getMeetupAttendeesCount(meetupId)
    await this.attendeeRepository.updateMeetupAttendeesCount(
      meetupId,
      totalMeetupAttendees,
    )

    const totalUserMeetupsAttended =
      await this.attendeeRepository.getUserMeetupsAttendedCount(userId)
    await this.attendeeRepository.updateUserMeetupsAttended(
      userId,
      totalUserMeetupsAttended,
    )
  }
}

export default AttendeeService
