import { getConnection } from "../../infrastructure/Database/MySQLClient.js";

export class AttendeeRepository {
  async createAttendee(meetupId, userId, willAttend) {
    const connection = await getConnection();

    try {
      const insertQuery = `
        INSERT INTO Attendees (meetup_id, user_id, will_attend)
        VALUES (?, ?, ?)
      `;

      const [insertResult] = await connection.query(insertQuery, [
        meetupId,
        userId,
        willAttend,
      ]);

      return insertResult.insertId;
    } finally {
      connection.release();
    }
  }

  async createOrUpdateAttendee(meetupId, userId) {
    const connection = await getConnection();

    try {
      await connection.beginTransaction();

      const existingAttendee = await this.getAttendeeByMeetupAndUser(
        meetupId,
        userId
      );

      const newWillAttend = existingAttendee
        ? !existingAttendee.willAttend
        : true;

      if (existingAttendee) {
        await this.updateAttendee(meetupId, userId, newWillAttend);
      } else {
        await this.createAttendee(meetupId, userId, newWillAttend);
      }

      const totalMeetupAttendees = await this.getMeetupAttendeesCount(meetupId);

      await this.updateMeetupAttendeesCount(meetupId, totalMeetupAttendees);

      const totalUserMeetupsAttended = await this.getUserMeetupsAttendedCount(
        userId
      );

      await this.updateUserMeetupsAttended(userId, totalUserMeetupsAttended);

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async getAttendeesByMeetup(meetupId) {
    const connection = await getConnection();

    try {
      const [result] = await connection.query(
        "SELECT * FROM Attendees WHERE meetup_id = ?",
        [meetupId]
      );

      return result;
    } finally {
      connection.release();
    }
  }

  async getAttendeeByMeetupAndUser(meetupId, userId) {
    const connection = await getConnection();

    try {
      const [result] = await connection.query(
        "SELECT * FROM Attendees WHERE meetup_id = ? AND user_id = ?",
        [meetupId, userId]
      );

      return result.length === 0 ? null : result[0];
    } finally {
      connection.release();
    }
  }

  async getMeetupAttendeesCount(meetupId) {
    const connection = await getConnection();

    try {
      const [result] = await connection.query(
        "SELECT COUNT(*) as totalAttendees FROM Attendees WHERE meetup_id = ? AND will_attend = 1",
        [meetupId]
      );

      return result[0].totalAttendees;
    } finally {
      connection.release();
    }
  }

  async getUserMeetupsAttendedCount(userId) {
    const connection = await getConnection();

    try {
      const [result] = await connection.query(
        "SELECT meetups_attended FROM users WHERE id = ?",
        [userId]
      );

      return result.length > 0 ? result[0].meetups_attended : 0;
    } finally {
      connection.release();
    }
  }

  async getAttendeeById(attendeeId) {
    const connection = await getConnection();

    try {
      const [result] = await connection.query(
        "SELECT * FROM Attendees WHERE id = ?",
        [attendeeId]
      );

      if (result.length === 0) {
        throw new Error(`Attendee with ID ${attendeeId} not found`);
      }

      return result[0];
    } finally {
      connection.release();
    }
  }

  async updateAttendee(meetupId, userId, newWillAttend) {
    const connection = await getConnection();

    try {
      await connection.query(
        "UPDATE Attendees SET will_attend = ? WHERE meetup_id = ? AND user_id = ?",
        [newWillAttend, meetupId, userId]
      );
    } finally {
      connection.release();
    }
  }

  async deleteAttendee(meetupId, userId) {
    const connection = await getConnection();

    try {
      await connection.query(
        "DELETE FROM Attendees WHERE meetup_id = ? AND user_id = ?",
        [meetupId, userId]
      );
    } finally {
      connection.release();
    }
  }

  async getTotalAttendeesCount() {
    const connection = await getConnection();

    try {
      const [result] = await connection.query(
        "SELECT COUNT(*) as totalAttendees FROM Attendees"
      );

      return result[0].totalAttendees;
    } finally {
      connection.release();
    }
  }

  async updateMeetupAttendeesCount(meetupId, totalAttendees) {
    const connection = await getConnection();

    try {
      await connection.query(
        "UPDATE Meetups SET attendees_count = ? WHERE id = ?",
        [totalAttendees, meetupId]
      );
    } finally {
      connection.release();
    }
  }

  async updateUserMeetupsAttended(userId, totalMeetupsAttended) {
    const connection = await getConnection();

    try {
      await connection.query(
        "UPDATE users SET meetups_attended = ? WHERE id = ?",
        [totalMeetupsAttended, userId]
      );
    } finally {
      connection.release();
    }
  }
}
