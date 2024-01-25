import { getConnection } from '../../infrastructure/Database/MySQLClient.js'

class OrganizerRepository {
  async createOrganizer(user_id, meetup_id) {
    const connection = await getConnection()
    try {
      if (meetup_id === undefined || user_id === undefined) {
        throw new Error('meetup_id and user_id must be defined')
      }

      const userExists = await connection.query(
        'SELECT COUNT(*) AS count FROM users WHERE id = ?',
        [user_id],
      )

      const meetupExists = await connection.query(
        'SELECT COUNT(*) AS count FROM Meetups WHERE id = ?',
        [meetup_id],
      )

      if (userExists[0][0].count === 0) {
        throw new Error(`User with ID: ${user_id} not found`)
      }

      if (meetupExists[0][0].count === 0) {
        throw new Error(`Meetup with ID: ${meetup_id} not found`)
      }

      const insertQuery =
        'INSERT INTO Organizers (user_id, meetup_id) VALUES (?, ?)'
      const [insertResult] = await connection.execute(insertQuery, [
        user_id,
        meetup_id,
      ])
      const newOrganizerId = insertResult.insertId
      return newOrganizerId
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async getOrganizersByMeetup(meetup_id) {
    const connection = await getConnection()
    try {
      const selectQuery = 'SELECT * FROM Organizers WHERE meetup_id = ?'
      const [result] = await connection.execute(selectQuery, [meetup_id])
      return result
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async getOrganizerById(organizerId) {
    const connection = await getConnection()
    try {
      const selectQuery = 'SELECT * FROM Organizers WHERE id = ?'
      const [result] = await connection.execute(selectQuery, [organizerId])

      if (result.length === 0) {
        return null
      }

      return result[0]
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }

  async deleteOrganizer(meetup_id, user_id) {
    const connection = await getConnection()
    try {
      const deleteQuery =
        'DELETE FROM Organizers WHERE meetup_id = ? AND user_id = ?'
      await connection.execute(deleteQuery, [meetup_id, user_id])
    } finally {
      if (connection) {
        connection.release()
      }
    }
  }
}

export { OrganizerRepository }
