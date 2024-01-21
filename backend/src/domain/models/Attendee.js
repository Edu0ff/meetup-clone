export class Attendee {
  static create(id, meetupId, userId, willAttend, createdAt) {
    return new Attendee(id, meetupId, userId, willAttend, createdAt);
  }

  constructor(id, meetupId, userId, willAttend, createdAt) {
    this.id = id;
    this.meetupId = meetupId;
    this.userId = userId;
    this.willAttend = willAttend;
    this.createdAt = createdAt;
  }

  getId() {
    return this.id;
  }

  getMeetupId() {
    return this.meetupId;
  }

  getUserId() {
    return this.userId;
  }

  getWillAttend() {
    return this.willAttend;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  hasId(id) {
    return this.id === id;
  }

  setMeetupId(meetupId) {
    this.meetupId = meetupId;
  }

  setUserId(userId) {
    this.userId = userId;
  }

  setWillAttend(willAttend) {
    this.willAttend = willAttend;
  }

  setCreatedAt(createdAt) {
    this.createdAt = createdAt;
  }
}
