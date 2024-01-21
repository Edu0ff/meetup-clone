import { AttendeeRepository } from '../../domain/repository/AttendeeRepository.js'

export class AttendeeRepositoryMock extends AttendeeRepository {
  constructor() {
    super()
    this.attendees = []
  }

  async createAttendee(meetupId, userId, willAttend) {
    const newAttendee = {
      id: this.attendees.length + 1,
      meetup_id: meetupId,
      user_id: userId,
      will_attend: willAttend,
    }

    this.attendees.push(newAttendee)
    return newAttendee.id
  }

  async getAttendeesByMeetup(meetupId) {
    return this.attendees.filter((attendee) => attendee.meetup_id === meetupId)
  }

  async getAttendeeById(attendeeId) {
    const attendee = this.attendees.find(
      (attendee) => attendee.id === attendeeId,
    )
    if (!attendee) {
      throw new Error(`Attendee with ID ${attendeeId} not found`)
    }
    return attendee
  }

  async deleteAttendee(meetupId, userId) {
    const index = this.attendees.findIndex(
      (attendee) =>
        attendee.meetup_id === meetupId && attendee.user_id === userId,
    )

    if (index === -1) {
      throw new Error(
        `Attendee with meetup ID ${meetupId} and user ID ${userId} not found`,
      )
    }

    this.attendees.splice(index, 1)
  }

  async getAttendeeByMeetupAndUser(meetupId, userId) {
    return this.attendees.find(
      (attendee) =>
        attendee.meetup_id === meetupId && attendee.user_id === userId,
    )
  }

  async updateAttendee(meetupId, userId, willAttend) {
    const existingAttendeeIndex = this.attendees.findIndex(
      (attendee) =>
        attendee.meetup_id === meetupId && attendee.user_id === userId,
    )

    if (existingAttendeeIndex !== -1) {
      if (!willAttend) {
        this.attendees.splice(existingAttendeeIndex, 1)
      }
    } else {
      this.attendees.push({
        id: this.attendees.length + 1,
        meetup_id: meetupId,
        user_id: userId,
        will_attend: willAttend,
      })
    }
  }

  async getTotalAttendeesCount() {
    return this.attendees.length
  }

  async getMeetupAttendeesCount(meetupId) {
    return this.attendees.filter(
      (attendee) =>
        attendee.meetup_id === meetupId && attendee.will_attend === 1,
    ).length
  }

  async updateMeetupAttendeesCount(meetupId, totalAttendees) {
    const meetupIndex = this.attendees.findIndex(
      (attendee) => attendee.meetup_id === meetupId,
    )

    if (meetupIndex !== -1) {
      this.attendees[meetupIndex].meetup_attendees_count = totalAttendees
    }
  }

  async getUserMeetupsAttendedCount(userId) {
    return this.attendees.filter(
      (attendee) => attendee.user_id === userId && attendee.will_attend,
    ).length
  }

  async updateUserMeetupsAttended(userId) {
    const userMeetups = this.attendees.filter(
      (attendee) => attendee.user_id === userId && attendee.will_attend,
    )
    const totalMeetupsAttended = userMeetups.length

    this.attendees.find(
      (attendee) => attendee.user_id === userId,
    ).meetups_attended = totalMeetupsAttended
  }
}
