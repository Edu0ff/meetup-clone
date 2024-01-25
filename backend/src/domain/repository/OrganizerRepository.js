import { getConnection } from '../../infrastructure/Database/MySQLClient.js'

class OrganizerRepository {
  async createOrganizer(user_id, meetup_id) {
    const connection = await getConnection()

    try {
      if (meetup_id === undefined || user_id === undefined) {
        throw new Error('meetup_id and user_id must be defined')
      }

      const [userExists] = await connection.execute(
        'SELECT COUNT(*) AS count FROM users WHERE id = ?',
        [user_id],
      )

      const [meetupExists] = await connection.execute(
        'SELECT COUNT(*) AS count FROM Meetups WHERE id = ?',
        [meetup_id],
      )

      if (userExists[0].count === 0) {
        throw new Error(`User with ID: ${user_id} not found`)
      }

      if (meetupExists[0].count === 0) {
        throw new Error(`Meetup with ID: ${meetup_id} not found`)
      }

      const [userResult] = await connection.execute(
        'SELECT username FROM users WHERE id = ?',
        [user_id],
      )

      if (userResult.length === 0) {
        throw new Error(`User with ID: ${user_id} not found`)
      }

      const username = userResult[0].username

      const [insertResult] = await connection.execute(
        'INSERT INTO Organizers (user_id, meetup_id, username) VALUES (?, ?, ?)',
        [user_id, meetup_id, username],
      )

      const newOrganizerId = insertResult.insertId

      const [organizerResult] = await connection.execute(
        'SELECT * FROM Organizers WHERE id = ?',
        [newOrganizerId],
      )

      if (organizerResult.length === 0) {
        throw new Error(
          `Failed to fetch organizer information for ID: ${newOrganizerId}`,
        )
      }

      const organizerData = organizerResult[0]

      // Crear y devolver un objeto Organizers
      const newOrganizer = Organizers.create(
        organizerData.id,
        organizerData.user_id,
        organizerData.meetup_id,
        organizerData.created_at,
      )

      return newOrganizer
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
