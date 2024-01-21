import { UserEmail } from './UserEmail.js'
import { UserPassword } from './UserPassword.js'

export class User {
  static create(
    id,
    username,
    name,
    last_name,
    category,
    bio,
    email,
    password,
    meetups_attended,
    avatar,
  ) {
    return new User(
      id,
      username,
      name,
      last_name,
      category,
      bio,
      email,
      UserPassword.fromPlain(password),
      meetups_attended,
      avatar,
    )
  }

  constructor(
    id,
    username,
    name,
    last_name,
    category,
    bio,
    email,
    password,
    meetups_attended,
    avatar,
  ) {
    this.id = id
    this.username = username
    this.name = name
    this.last_name = last_name
    this.category = category
    this.bio = bio
    this.email = new UserEmail(email)
    this.password = password
    this.meetups_attended = meetups_attended
    this.avatar = avatar
  }

  getId() {
    return this.id
  }

  hasId(id) {
    return this.id === id
  }

  hasUsername(username) {
    return this.username === username
  }
  hasName(name) {
    return this.name === name
  }

  hasLastName(last_name) {
    return this.last_name === last_name
  }

  hasCategory(category) {
    return this.category === category
  }

  hasBio(bio) {
    return this.bio === bio
  }

  hasEmail(email) {
    return this.email.equals(new UserEmail(email))
  }

  hasPassword(plainPassword) {
    return this.password.compareWith(plainPassword)
  }

  getPassword() {
    return this.password
  }
  hasMeetupsAttended(meetups_attended) {
    return this.meetups_attended === meetups_attended
  }
  hasAvatar(avatar) {
    return this.avatar === avatar
  }
}
