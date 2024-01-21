import { AttendeeRepository } from "../repository/AttendeeRepository.js";
import { getConnection } from "../../infrastructure/Database/MySQLClient.js";

class AttendeeService {
  constructor() {
    this.attendeeRepository = new AttendeeRepository();
  }

  async createOrUpdateAttendee(meetupId, userId) {
    let connection;
    try {
      connection = await getConnection();
      await connection.beginTransaction();

      const existingAttendee =
        await this.attendeeRepository.getAttendeeByMeetupAndUser(
          meetupId,
          userId
        );

      if (existingAttendee) {
        await this.attendeeRepository.deleteAttendee(meetupId, userId);
      } else {
        await this.attendeeRepository.createAttendee(meetupId, userId, true);
      }

      const totalMeetupAttendees =
        await this.attendeeRepository.getMeetupAttendeesCount(meetupId);
      await this.attendeeRepository.updateMeetupAttendeesCount(
        meetupId,
        totalMeetupAttendees
      );

      const totalUserMeetupsAttended =
        await this.attendeeRepository.getUserMeetupsAttendedCount(userId);
      await this.attendeeRepository.updateUserMeetupsAttended(
        userId,
        totalUserMeetupsAttended
      );

      await connection.commit();
    } catch (error) {
      if (connection) await connection.rollback();
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }

  async getAttendeesByMeetup(meetupId) {
    return this.attendeeRepository.getAttendeesByMeetup(meetupId);
  }

  async getAttendeeById(attendeeId) {
    return this.attendeeRepository.getAttendeeById(attendeeId);
  }

  async updateAttendee(meetupId, userId) {
    await this.createOrUpdateAttendee(meetupId, userId);
  }

  async toggleAttendee(meetupId, userId) {
    let connection;
    try {
      connection = await getConnection();
      await connection.beginTransaction();

      const existingAttendee =
        await this.attendeeRepository.getAttendeeByMeetupAndUser(
          meetupId,
          userId
        );

      if (existingAttendee) {
        const newWillAttend = !existingAttendee.willAttend;
        await this.attendeeRepository.updateAttendee(
          meetupId,
          userId,
          newWillAttend
        );
      } else {
        await this.attendeeRepository.createAttendee(meetupId, userId, true);
      }

      const totalMeetupAttendees =
        await this.attendeeRepository.getMeetupAttendeesCount(meetupId);
      await this.attendeeRepository.updateMeetupAttendeesCount(
        meetupId,
        totalMeetupAttendees
      );

      const totalUserMeetupsAttended =
        await this.attendeeRepository.getUserMeetupsAttendedCount(userId);
      await this.attendeeRepository.updateUserMeetupsAttended(
        userId,
        totalUserMeetupsAttended
      );

      await connection.commit();
    } catch (error) {
      if (connection) await connection.rollback();
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }

  async getTotalAttendeesCount() {
    return this.attendeeRepository.getTotalAttendeesCount();
  }
}

export default AttendeeService;
