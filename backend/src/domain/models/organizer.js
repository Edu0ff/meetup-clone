export class Organizers {
  static create(id, userId, meetupId, createdAt) {
    return new Organizers(id, userId, meetupId, createdAt)
  }

  constructor(id, userId, meetupId, createdAt) {
    this.id = id
    this.userId = userId
    this.meetupId = meetupId
    this.createdAt = createdAt
  }

  getId() {
    return this.id
  }

  getMeetupId() {
    return this.meetupId
  }

  getUserId() {
    return this.userId
  }

  getCreatedAt() {
    return this.createdAt
  }

  hasId(id) {
    return this.id === id
  }

  setMeetupId(meetupId) {
    this.meetupId = meetupId
  }

  setUserId(userId) {
    this.userId = userId
  }

  setCreatedAt(createdAt) {
    this.createdAt = createdAt
  }
}
