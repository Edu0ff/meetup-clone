import dotenv from 'dotenv'
dotenv.config()
import { getConnection } from '../../UserRepository/MySQLClient.js'
import bcrypt from 'bcrypt'
import chalk from 'chalk'

async function main() {
  let connection
  try {
    connection = await getConnection()
    console.log(chalk.green('Connected'))
    console.log(chalk.yellow('Dropping existing tables'))
    await dropTableIfExists(connection, 'attendees')
    await dropTableIfExists(connection, 'organizers')
    await dropTableIfExists(connection, 'meetups')
    await dropTableIfExists(connection, 'users')

    console.log(chalk.yellow('Creating tables'))

    await createUsersTable(connection)
    await createMeetupsTable(connection)
    await createOrganizersTable(connection)
    await createAttendeesTable(connection)

    await insertData(connection)
    await updateCounters(connection)
  } catch (error) {
    console.error(error)
  } finally {
    if (connection) connection.release()
    process.exit()
  }
}

async function dropTableIfExists(connection, tableName) {
  await connection.query(`SET FOREIGN_KEY_CHECKS = 0`)
  await connection.query(`DROP TABLE IF EXISTS ${tableName}`)
  console.log(chalk.green(`Table ${tableName} dropped if exists.`))
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
    {
      username: 'user4',
      bio: 'Bio de usuario 4',
      email: 'user4@example.com',
      avatar: 'https://picsum.photos/200',
      password: 'password4',
    },
    {
      username: 'user5',
      bio: 'Bio de usuario 5',
      email: 'user5@example.com',
      avatar: 'https://picsum.photos/200',
      password: 'password5',
    },
  ]

  for (const user of usersToInsert) {
    const saltRounds = 10
    user.password = await bcrypt.hash(user.password, saltRounds)
    await connection.query(`INSERT INTO users SET ?`, user)
  }

  console.log(chalk.green('Table users created and populated with 5 users.'))
}

async function createMeetupsTable(connection) {
  await connection.query(`
   CREATE TABLE IF NOT EXISTS meetups (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  picture VARCHAR(255) NOT NULL,
  theme VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  date DATETIME NOT NULL, -- O TIMESTAMP
  time TIME NOT NULL,
  attendees_count INT DEFAULT 0,  
  organizer_id INT, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (organizer_id) REFERENCES users(id) 
);
  `)

  const meetupsToInsert = [
    {
      title: 'Meetup 1',
      description: 'Descripción de la meetup 1',
      picture: 'https://picsum.photos/800',
      theme: 'Videogames',
      location: 'Ciudad 1',
      address: 'Dirección 1',
      date: '2025-01-01',
      time: '12:00:00',
      organizer_id: 1,
    },
    {
      title: 'Meetup 2',
      description: 'Descripción de la meetup 2',
      picture: 'https://picsum.photos/800',
      theme: 'Technology',
      location: 'Ciudad 2',
      address: 'Dirección 2',
      date: '2025-02-02',
      time: '12:00:00',
      organizer_id: 2,
    },
    {
      title: 'Meetup 3',
      description: 'Descripción de la meetup 3',
      picture: 'https://picsum.photos/800',
      theme: 'Technology',
      location: 'Ciudad 3',
      address: 'Dirección 3',
      date: '2025-03-03',
      time: '12:00:00',
      organizer_id: 3,
    },
    {
      title: 'Meetup 4',
      description: 'Descripción de la meetup 4',
      picture: 'https://picsum.photos/800',
      theme: 'Videogames',
      location: 'Lugar 4',
      address: 'Dirección 4',
      date: '2025-04-04',
      time: '12:00:00',
      organizer_id: 4,
    },
    {
      title: 'Meetup 5',
      description: 'Descripción de la meetup 5',
      picture: 'https://picsum.photos/800',
      theme: 'Art and Culture',
      location: 'Lugar 5',
      address: 'Dirección 5',
      date: '2025-05-05',
      time: '12:00:00',
      organizer_id: 5,
    },
  ]

  for (const meetup of meetupsToInsert) {
    await connection.query(`INSERT INTO meetups SET ?`, meetup)
  }

  console.log(
    chalk.green('Table Meetups created and populated with 5 meetups.'),
  )
}

async function createOrganizersTable(connection) {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS organizers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      meetup_id INT,
      username VARCHAR(50),  -- Agregar la columna username
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (meetup_id) REFERENCES Meetups(id)
    )
  `)

  console.log(chalk.green('Table Organizers created.'))
}

async function createAttendeesTable(connection) {
  await connection.query(`CREATE TABLE IF NOT EXISTS attendees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    meetup_id INT,
    user_id INT,
    username VARCHAR(50),
    will_attend BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (meetup_id) REFERENCES Meetups(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );`)

  console.log(chalk.green('Table Attendees created.'))
}

async function insertData(connection) {
  const organizersToInsert = [
    { user_id: 1, meetup_id: 1, username: 'user1' },
    { user_id: 2, meetup_id: 2, username: 'user2' },
    { user_id: 3, meetup_id: 3, username: 'user3' },
    { user_id: 4, meetup_id: 4, username: 'user4' },
    { user_id: 5, meetup_id: 5, username: 'user5' },
  ]

  const attendeesToInsert = [
    { meetup_id: 1, user_id: 1, username: 'user1', will_attend: true },
    { meetup_id: 2, user_id: 2, username: 'user2', will_attend: true },
    { meetup_id: 3, user_id: 3, username: 'user3', will_attend: true },
    { meetup_id: 4, user_id: 4, username: 'user4', will_attend: true },
    { meetup_id: 5, user_id: 5, username: 'user5', will_attend: true },
  ]

  for (const organizer of organizersToInsert) {
    await connection.query(`INSERT INTO organizers SET ?`, organizer)
  }

  for (const attendee of attendeesToInsert) {
    await connection.query(`INSERT INTO attendees SET ?`, attendee)
  }

  console.log(chalk.green('Data inserted.'))
}

async function updateCounters(connection) {
  await connection.query(`
    UPDATE meetups
    SET attendees_count = (
      SELECT COUNT(*)
      FROM attendees
      WHERE Attendees.meetup_id = Meetups.id
      AND Attendees.will_attend = 1
    )
  `)

  await connection.query(`
    UPDATE users
    SET meetups_attended = (
      SELECT COUNT(*)
      FROM attendees
      WHERE Attendees.user_id = users.id
      AND Attendees.will_attend = 1
    )
  `)

  console.log(chalk.green('Attendees updated.'))
}

main()
