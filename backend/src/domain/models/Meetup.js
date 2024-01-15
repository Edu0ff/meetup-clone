export class Meetup {
  static create(
    id,
    title,
    picture,
    theme,
    location,
    date,
    time,
    attendeesCount
  ) {
    return new Meetup(
      id,
      title,
      picture,
      theme,
      location,
      date,
      time,
      attendeesCount
    );
  }

  constructor(id, title, picture, theme, location, date, time, attendeesCount) {
    this.id = id;
    this.title = title;
    this.picture = picture;
    this.theme = theme;
    this.location = location;
    this.date = date;
    this.time = time;
    this.attendeesCount = attendeesCount;
  }

  getId() {
    return this.id;
  }

  hasId(id) {
    return this.id === id;
  }

  getTitle() {
    return this.title;
  }

  getPicture() {
    return this.picture;
  }

  getTheme() {
    return this.theme;
  }

  getLocation() {
    return this.location;
  }

  getDate() {
    return this.date;
  }

  getTime() {
    return this.time;
  }

  getAttendeesCount() {
    return this.attendeesCount;
  }

  setTitle(title) {
    this.title = title;
  }

  setPicture(picture) {
    this.picture = picture;
  }

  setTheme(theme) {
    this.theme = theme;
  }

  setLocation(location) {
    this.location = location;
  }

  setDate(date) {
    this.date = date;
  }

  setTime(time) {
    this.time = time;
  }

  setAttendeesCount(attendeesCount) {
    this.attendeesCount = attendeesCount;
  }
}
