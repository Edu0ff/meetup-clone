import { AttendeeRepositoryMock } from './AttendeeRepositoryMock'
import { describe, expect, it, beforeEach } from 'vitest'

describe('AttendeeRepositoryMock', () => {
  let attendeeRepositoryMock

  beforeEach(() => {
    attendeeRepositoryMock = new AttendeeRepositoryMock()
  })

  describe('Create Attendee', () => {
    it('should create an attendee', async () => {
      const meetupId = 1
      const userId = 1
      const willAttend = true

      const attendeeId = await attendeeRepositoryMock.createAttendee(
        meetupId,
        userId,
        willAttend,
      )

      expect(attendeeId).toBe(1)
    })
  })

  describe('Get Attendees by Meetup', () => {
    it('should get attendees by meetup', async () => {
      const meetupId = 1

      const attendees =
        await attendeeRepositoryMock.getAttendeesByMeetup(meetupId)

      expect(Array.isArray(attendees)).toBe(true)
    })
  })

  describe('Get Attendee by ID', () => {
    it('should get an attendee by ID', async () => {
      const meetupId = 1
      const userId = 1
      const willAttend = true

      const attendeeId = await attendeeRepositoryMock.createAttendee(
        meetupId,
        userId,
        willAttend,
      )

      const retrievedAttendee =
        await attendeeRepositoryMock.getAttendeeById(attendeeId)

      expect(retrievedAttendee).toBeDefined()
      expect(retrievedAttendee).toEqual({
        id: attendeeId,
        meetup_id: meetupId,
        user_id: userId,
        will_attend: willAttend,
      })
    })

    it('should throw an error when trying to get an attendee that does not exist', async () => {
      const attendeeId = 9999
      await expect(
        attendeeRepositoryMock.getAttendeeById(attendeeId),
      ).rejects.toThrow(`Attendee with ID ${attendeeId} not found`)
    })

    it('should remove attendee from event if already attending', async () => {
      const meetupId = 1
      const userId = 1
      const willAttend = true

      const attendeeId = await attendeeRepositoryMock.createAttendee(
        meetupId,
        userId,
        willAttend,
      )

      let retrievedAttendee =
        await attendeeRepositoryMock.getAttendeeById(attendeeId)
      expect(retrievedAttendee).toBeDefined()

      await attendeeRepositoryMock.deleteAttendee(meetupId, userId)

      try {
        retrievedAttendee =
          await attendeeRepositoryMock.getAttendeeById(attendeeId)

        fail('Expected to throw an error for non-existent attendee')
      } catch (error) {
        expect(error.message).toBe(`Attendee with ID ${attendeeId} not found`)
      }
    })
  })
})
