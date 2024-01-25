export class Meetup {
  static create(
    id,
    title,
    description,
    picture,
    theme,
    location,
    date,
    time,
    attendees_count,
    organizer_id,
  ) {
    return new Meetup(
      id,
      title,
      description,
      picture,
      theme,
      location,
      address,
      date,
      time,
      attendees_count,
      organizer_id,
    )
  }

  constructor(
    id,
    title,
    description,
    picture,
    theme,
    location,
    address,
    date,
    time,
    attendees_count,
    organizer_id,
  ) {
    this.id = id
    this.title = title
    this.description = description
    this.picture = picture
    this.theme = theme
    this.location = location
    this.address = address
    this.date = date
    this.time = time
    this.attendees_count = attendees_count
    this.organizer_id = organizer_id
  }

  getId() {
    return this.id
  }

  hasId(id) {
    return this.id === id
  }

  getTitle() {
    return this.title
  }

  getDescription() {
    return this.description
  }

  getPicture() {
    return this.picture
  }

  getTheme() {
    return this.theme
  }

  getLocation() {
    return this.location
  }

  getAddress() {
    return this.address
  }

  getDate() {
    return this.date
  }

  getTime() {
    return this.time
  }

  getAttendees_Count() {
    return this.attendees_count
  }

  getOrganizer_Id() {
    return this.organizer_id
  }

  setTitle(title) {
    this.title = title
  }

  setDescription(description) {
    this.description = description
  }

  setPicture(picture) {
    this.picture = picture
  }

  setTheme(theme) {
    this.theme = theme
  }

  setLocation(location) {
    this.location = location
  }

  setAddress(address) {
    this.address = address
  }

  setDate(date) {
    this.date = date
  }

  setTime(time) {
    this.time = time
  }

  setAttendeesCount(attendees_count) {
    this.attendees_count = attendees_count
  }
  setOrganizer_Id(organizer_id) {
    this.organizer_id = organizer_id
  }
}
