import dotenv from 'dotenv'
dotenv.config()
import { getConnection } from '../../UserRepository/MySQLClient.js'
import bcrypt from 'bcrypt'

async function main() {
  let connection
  try {
    connection = await getConnection()
    console.log('connected')
    console.log('Dropping existing tables')
    await dropTableIfExists(connection, 'Attendees')
    await dropTableIfExists(connection, 'Meetups')
    await dropTableIfExists(connection, 'users')

    console.log('Creating tables')

    await createUsersTable(connection)
    await createMeetupsTable(connection)
    await createAttendeesTable(connection)

    await insertAttendees(connection)
    await updateCounters(connection)
  } catch (error) {
    console.error(error)
  } finally {
    if (connection) connection.release()
    process.exit()
  }
}

async function dropTableIfExists(connection, tableName) {
  await connection.query(`DROP TABLE IF EXISTS ${tableName}`)
  console.log(`Table ${tableName} dropped if exists.`)
}

async function createUsersTable(connection) {
  await connection.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    bio VARCHAR(255) NOT NULL,
    email VARCHAR(90) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    meetups_attended INT DEFAULT 0,  
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`)

  const usersToInsert = [
    {
      username: 'user1',
      bio: 'Bio de usuario 1',
      email: 'user1@example.com',
      avatar: 'https://picsum.photos/200',
      password: 'password1',
    },
    {
      username: 'user2',
      bio: 'Bio de usuario 2',
      email: 'user2@example.com',
      avatar: 'https://picsum.photos/200',
      password: 'password2',
    },
    {
      username: 'user3',
      bio: 'Bio de usuario 3',
      email: 'user3@example.com',
      avatar: 'https://picsum.photos/200',
      password: 'password3',
    },
  ]

  for (const user of usersToInsert) {
    const saltRounds = 10
    user.password = await bcrypt.hash(user.password, saltRounds)
    await connection.query(`INSERT INTO users SET ?`, user)
  }

  console.log(
    'Table users created and populated with 3 users and 3 administrators.',
  )
}

async function createMeetupsTable(connection) {
  await connection.query(`CREATE TABLE IF NOT EXISTS Meetups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    picture VARCHAR(255) NOT NULL,
    theme VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    date DATE,
    time TIME,
    attendees_count INT DEFAULT 0,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`)

  const meetupsToInsert = [
    {
      title: 'Meetup lejana',
      picture: 'https://picsum.photos/200',
      theme: 'Tema 1',
      location: 'Lugar 1',
      date: '2025-01-01',
      time: '12:00:00',
    },
    {
      title: 'Meetup Pasada',
      picture: 'https://picsum.photos/200',
      theme: 'Tema 2',
      location: 'Lugar 2',
      date: '2021-02-02',
      time: '12:00:00',
    },
    {
      title: 'Meetup cercana',
      picture: 'https://picsum.photos/200',
      theme: 'Tema 3',
      location: 'Lugar 3',
      date: '2024-03-03',
      time: '12:00:00',
    },
  ]

  for (const meetup of meetupsToInsert) {
    await connection.query(`INSERT INTO Meetups SET ?`, meetup)
  }

  console.log('Table Meetups created and populated with examples.')
}

async function createAttendeesTable(connection) {
  await connection.query(`CREATE TABLE IF NOT EXISTS Attendees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    meetup_id INT,
    user_id INT,
    will_attend BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (meetup_id) REFERENCES Meetups(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`)

  console.log('Table Attendees created.')
}

async function insertAttendees(connection) {
  const attendeesToInsert = [
    {
      meetup_id: 1,
      user_id: 1,
      will_attend: true,
    },
  ]

  for (const attendee of attendeesToInsert) {
    await connection.query(`INSERT INTO Attendees SET ?`, attendee)
  }

  console.log('Attendees inserted.')
}

async function updateCounters(connection) {
  await connection.query(`
    UPDATE Meetups
    SET attendees_count = (
      SELECT COUNT(*)
      FROM Attendees
      WHERE Attendees.meetup_id = Meetups.id
      AND Attendees.will_attend = 1
    )
  `)

  await connection.query(`
    UPDATE users
    SET meetups_attended = (
      SELECT COUNT(*)
      FROM Attendees
      WHERE Attendees.user_id = users.id
      AND Attendees.will_attend = 1
    )
  `)

  console.log('Counters updated.')
}

main()
