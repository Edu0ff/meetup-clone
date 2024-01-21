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
}
