import { getConnection } from "../../infrastructure/Database/MySQLClient.js";

export class MeetupRepository {
  async createMeetup(meetupData) {
    let connection;
    try {
      connection = await getConnection();

      const insertQuery = `INSERT INTO meetups (title, picture, theme, location, date, time, attendees_count) VALUES (?, ?, ?, ?, ?, ?, ?) `;
      const [insertResult] = await connection.query(insertQuery, [
        meetupData.title,
        meetupData.picture,
        meetupData.theme,
        meetupData.location,
        meetupData.date,
        meetupData.time,
        meetupData.attendees_count,
      ]);

      return insertResult.insertId;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async listMeetups() {
    let connection;
    try {
      connection = await getConnection();
      const [meetups] = await connection.query("SELECT * FROM meetups");
      return meetups;
    } finally {
      if (connection) {
        connection.release();
      }
    }
  }

  async getMeetupsById(id) {
    if (!id) {
      throw new Error("No se proporcionó un ID.");
    }
    let connection;
    try {
      connection = await getConnection();

      const [meetups] = await connection.query(
        `SELECT * FROM meetups WHERE id = ?`,
        [id]
      );

      if (meetups.length === 0) {
        throw new Error(`Meetup with ID: ${id} not found`);
      }

      return meetups[0];
    } finally {
      if (connection) connection.release();
    }
  }

  async updateMeetup(id, meetupData) {
    if (!id) {
      throw new Error("No se proporcionó un ID.");
    }
    let connection;
    try {
      connection = await getConnection();

      const updateQuery = `UPDATE meetups SET title = ?, picture = ?, theme = ?, location = ?, date = ?, time = ? WHERE id = ?`;
      await connection.query(updateQuery, [
        meetupData.title,
        meetupData.picture,
        meetupData.theme,
        meetupData.location,
        meetupData.date,
        meetupData.time,
        id, 
      ]);

      return;
    } finally {
      if (connection) connection.release();
    }
  }

  async deleteMeetupById(id) {
    if (!id) {
      throw new Error("No se proporcionó un ID.");
    }
    let connection;
    try {
      connection = await getConnection();

      await connection.query(
        `
        DELETE FROM meetups WHERE id = ?
      `,
        [id]
      );

      return;
    } finally {
      if (connection) connection.release();
    }
  }

  async updateAttendeesCountWithUserId(meetupId, userId, willAttend = true) {
    let connection;
    try {
      connection = await getConnection();

      const [userResult] = await connection.query(
        "SELECT * FROM users WHERE id = ?",
        [userId]
      );
      if (userResult.length === 0) {
        throw new Error(`User with ID ${userId} not found`);
      }

      const [meetupResult] = await connection.query(
        "SELECT * FROM Meetups WHERE id = ?",
        [meetupId]
      );
      if (meetupResult.length === 0) {
        throw new Error(`Meetup with ID ${meetupId} not found`);
      }

      const attendeesCount = willAttend
        ? meetupResult[0].attendees_count + 1
        : Math.max(0, meetupResult[0].attendees_count - 1);

      await connection.query(
        "UPDATE Meetups SET attendees_count = ? WHERE id = ?",
        [attendeesCount, meetupId]
      );
    } finally {
      if (connection) connection.release();
    }
  }
}
