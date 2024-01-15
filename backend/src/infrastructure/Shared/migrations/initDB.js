import dotenv from "dotenv";
dotenv.config();
import { getConnection } from "../../UserRepository/MySQLClient.js";
import bcrypt from "bcrypt";

async function main() {
  let connection;
  try {
    connection = await getConnection();
    console.log("connected");
    console.log("Dropping existing tables");
    await dropTableIfExists(connection, "Meetups");
    await dropTableIfExists(connection, "users");

    console.log("Creating tables");

    await createUsersTable(connection);
    await createMeetupsTable(connection);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

async function dropTableIfExists(connection, tableName) {
  await connection.query(`DROP TABLE IF EXISTS ${tableName}`);
  console.log(`Table ${tableName} dropped if exists.`);
}

async function createUsersTable(connection) {
  await connection.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(50),
    last_name VARCHAR(50),
    category ENUM('usuario', 'administrador'), 
    bio VARCHAR(255) NOT NULL,
    email VARCHAR(90) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    meetups_attended INT DEFAULT 0, 
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`);

  const usersToInsert = [
    {
      username: "user1",
      name: "Pedro",
      last_name: "Pérez",
      category: "usuario",
      bio: "Bio de usuario 1",
      email: "user1@example.com",
      avatar: "https://picsum.photos/200",
      password: "password1",
    },
    {
      username: "user2",
      name: "Juan",
      last_name: "García",
      category: "usuario",
      bio: "Bio de usuario 2",
      email: "user2@example.com",
      avatar: "https://picsum.photos/200",
      password: "password2",
    },
    {
      username: "user3",
      name: "Pablo",
      last_name: "López",
      category: "usuario",
      bio: "Bio de usuario 3",
      email: "user3@example.com",
      avatar: "https://picsum.photos/200",
      password: "password3",
    },
    {
      username: "admin1",
      name: "María",
      category: "administrador",
      bio: "Bio de administrador 1",
      email: "admin1@example.com",
      avatar: "https://picsum.photos/200",
      password: "adminpassword1",
    },
    {
      username: "admin2",
      name: "Edu",
      category: "administrador",
      bio: "Bio de administrador 2",
      email: "admin2@example.com",
      avatar: "https://picsum.photos/200",
      password: "adminpassword2",
    },
    {
      username: "admin3",
      name: "Ana",
      category: "administrador",
      bio: "Bio de administrador 3",
      email: "admin3@example.com",
      avatar: "https://picsum.photos/200",
      password: "adminpassword3",
    },
  ];

  for (const user of usersToInsert) {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
    await connection.query(`INSERT INTO users SET ?`, user);
  }

  console.log(
    "Table users created and populated with 3 users and 3 administrators."
  );
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
    attendees_count INT DEFAULT 1,  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`);

  const meetupsToInsert = [
    {
      title: "Meetup 1",
      picture: "https://picsum.photos/200",
      theme: "Tema 1",
      location: "Lugar 1",
      date: "2021-01-01",
      time: "12:00:00",
    },
    {
      title: "Meetup 2",
      picture: "https://picsum.photos/200",
      theme: "Tema 2",
      location: "Lugar 2",
      date: "2021-02-02",
      time: "12:00:00",
    },
    {
      title: "Meetup 3",
      picture: "https://picsum.photos/200",
      theme: "Tema 3",
      location: "Lugar 3",
      date: "2021-03-03",
      time: "12:00:00",
    },
  ];

  for (const meetup of meetupsToInsert) {
    await connection.query(`INSERT INTO Meetups SET ?`, meetup);
  }

  console.log("Table Meetups created and populated with examples.");
}

main();
