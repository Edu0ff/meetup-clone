export class Meetup {
  static create(
    id,
    title,
    picture,
    theme,
    location,
    date,
    time,
    attendees_count
  ) {
    return new Meetup(
      id,
      title,
      picture,
      theme,
      location,
      date,
      time,
      attendees_count
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
    this.attendees_count = attendees_count;
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

  setAttendeesCount(attendees_count) {
    this.attendees_count = attendees_count;
  }
}
