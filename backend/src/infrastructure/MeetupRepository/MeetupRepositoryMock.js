import { MeetupRepository } from "../../domain/repository/MeetupRepository";

export class MeetupRepositoryMock extends MeetupRepository {
  constructor() {
    super();
    this.meetups = [];
  }

  async createMeetup(meetupData) {
    if (
      !meetupData.title ||
      !meetupData.picture ||
      !meetupData.theme ||
      !meetupData.location ||
      !meetupData.date ||
      !meetupData.time ||
      !meetupData.attendees_count
    ) {
      throw new Error("Please provide all required meetup information.");
    }

    const newMeetup = { id: this.meetups.length + 1, ...meetupData };
    this.meetups.push(newMeetup);
    return newMeetup.id;
  }

  async listMeetups() {
    return this.meetups;
  }

  async getMeetupsById(id) {
    const meetup = this.meetups.find((meetup) => meetup.id === id);
    if (!meetup) {
      throw new Error(`the meetup with ID: ${id} not found`);
    }
    return meetup;
  }

  async updateMeetup(id, meetupData) {
    const meetupIndex = this.meetups.findIndex((meetup) => meetup.id === id);

    if (meetupIndex === -1) {
      throw new Error(`the meetup with ID: ${id} not found`);
    }

    this.meetups[meetupIndex] = {
      ...this.meetups[meetupIndex],
      ...meetupData,
    };
  }

  async deleteMeetupById(id) {
    const meetupIndex = this.meetups.findIndex((meetup) => meetup.id === id);

    if (meetupIndex === -1) {
      throw new Error(`the meetup with ID: ${id} not found`);
    }

    this.meetups.splice(meetupIndex, 1);
  }

  async updateAttendeesCountWithUserId(meetupId, userId, willAttend = true) {
    const meetupIndex = this.meetups.findIndex((m) => m.id === meetupId);

    if (meetupIndex === -1) {
      throw new Error(`Meetup with ID: ${meetupId} not found`);
    }

    if (userId === undefined || userId === null) {
      throw new Error(`User ID is required`);
    }

    const meetup = this.meetups[meetupIndex];

    if (!meetup) {
      throw new Error(`Meetup with ID: ${meetupId} not found`);
    }

    if (willAttend) {
      meetup.attendees_count++;
    } else {
      meetup.attendees_count = Math.max(0, meetup.attendees_count - 1);
    }
  }
}
