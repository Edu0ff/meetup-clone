import { getConnection } from '../../UserRepository/MySQLClient.js'
import bcrypt from 'bcrypt'
import chalk from 'chalk'

async function seedDatabase() {
  try {
    const connection = await getConnection()

    await insertMeetups(connection)

    await insertUsers(connection)

    console.log(chalk.green('Datos ficticios insertados correctamente.'))
  } catch (error) {
    console.error('Error al insertar datos ficticios:', error)
  }
}

async function insertUsers(connection) {
  const saltRounds = 10
  const users = [
    {
      username: 'ayoze',
      bio: 'Bio de Ayoze',
      email: 'ayoze@admin.com',
      avatar: 'https://picsum.photos/200',
      password: 'adminayoze',
    },
    {
      username: 'anab',
      bio: 'Bio de Ana Belén',
      email: 'anab@admin.com',
      avatar: 'https://picsum.photos/200',
      password: 'adminana',
    },
  ]

  for (const user of users) {
    await connection.query('INSERT INTO users SET ?', user)
  }
}
async function insertMeetups(connection) {
  const meetups = [
    {
      title: 'Meetup 111',
      description: 'Descripción de la meetup 111',
      picture: 'https://picsum.photos/900',
      theme: 'Videogames',
      location: 'Ciudad 111',
      address: 'Dirección 1',
      date: '2025-01-01',
      time: '12:00:00',
      organizer_id: 1,
    },
    {
      title: 'Meetup 222',
      description: 'Descripción de la meetup 222',
      picture: 'https://picsum.photos/900',
      theme: 'Videogames',
      location: 'Ciudad 222',
      address: 'Dirección 1',
      date: '2025-01-01',
      time: '12:00:00',
      organizer_id: 1,
    },
  ]

  for (const meetup of meetups) {
    await connection.query('INSERT INTO meetups SET ?', meetup)
  }
}

seedDatabase()
