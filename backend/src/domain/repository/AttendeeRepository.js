import { getConnection } from "../../infrastructure/Database/MySQLClient.js";

export class AttendeeRepository {
  async createAttendee(meetupId, userId, willAttend) {
    let connection;
    try {
      connection = await getConnection();

      const insertQuery = `
        INSERT INTO Attendees (meetup_id, user_id, will_attend)
        VALUES (?, ?, ?)
      `;

      const [insertResult] = await connection.query(insertQuery, [
        meetupId,
        userId,
        willAttend,
      ]);

      const newAttendeeId = insertResult.insertId;
      return newAttendeeId;
    } finally {
      if (connection) {
        connection.release();
      }
    }
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

      const newWillAttend = existingAttendee
        ? !existingAttendee.willAttend
        : true;

      if (existingAttendee) {
        await this.attendeeRepository.updateAttendee(
          meetupId,
          userId,
          newWillAttend
        );
      } else {
        await this.attendeeRepository.createAttendee(
          meetupId,
          userId,
          newWillAttend
        );
      }

      const totalMeetupAttendees =
        await this.attendeeRepository.getMeetupAttendeesCount(meetupId);

      // Actualizamos el contador de asistentes
      await this.attendeeRepository.updateMeetupAttendeesCount(
        meetupId,
        totalMeetupAttendees
      );

      // Obtenemos el total de meetups a las que ha asistido el usuario
      const totalUserMeetupsAttended =
        await this.attendeeRepository.getUserMeetupsAttendedCount(userId);

      // Actualizamos la tabla de usuarios
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
    let connection;
    try {
      connection = await getConnection();

      const [result] = await connection.query(
        "SELECT COUNT(*) as totalAttendees FROM Attendees WHERE meetup_id = ? AND will_attend = 1",
        [meetupId]
      );

      return result[0].totalAttendees;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async getUserMeetupsAttendedCount(userId) {
    let connection;
    try {
      connection = await getConnection();

      const [result] = await connection.query(
        "SELECT meetups_attended FROM users WHERE id = ?",
        [userId]
      );

      return result.length > 0 ? result[0].meetups_attended : 0;
    } finally {
      if (connection) {
        connection.release();
      }
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

  async updateUserMeetupsAttended(userId) {
    let connection;
    try {
      connection = await getConnection();

      const [meetupsAttendedResult] = await connection.query(
        "SELECT COUNT(*) as totalMeetupsAttended FROM Attendees WHERE user_id = ? AND will_attend = 1",
        [userId]
      );

      const totalMeetupsAttended =
        meetupsAttendedResult[0].totalMeetupsAttended;

      await connection.query(
        "UPDATE users SET meetups_attended = ? WHERE id = ?",
        [totalMeetupsAttended, userId]
      );
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }
}
