import { MeetupRepository } from "../repository/MeetupRepository.js";

class MeetupService {
  constructor() {
    this.meetupRepository = new MeetupRepository();
  }

  async createMeetup({ title, picture, theme, location, date, time }) {
    if (!title || !picture || !theme || !location || !date || !time) {
      throw new Error("Please provide all required meetup information.");
    }

    const meetupData = {
      title,
      picture,
      theme,
      location,
      date,
      time,
      attendees_count: 1,
    };

    console.log("Meetup Data:", meetupData);

    const meetupId = await this.meetupRepository.createMeetup(meetupData);

    return meetupId;
  }
  async listMeetups() {
    return this.meetupRepository.listMeetups();
  }

  async updateMeetupById(id, meetupData) {
    const meetup = await this.meetupRepository.getMeetupsById(id);

    const updatedMeetup = {
      id: meetup.id,
      title: meetup.title,
      picture: meetup.picture,
      theme: meetup.theme,
      location: meetup.location,
      date: meetup.date,
      time: meetup.time,
      attendees_count: meetup.attendees_count,
      created_at: meetup.created_at,
      updated_at: meetup.updated_at,
      ...meetupData,
    };

    await this.meetupRepository.updateMeetup(id, updatedMeetup);

    return updatedMeetup;
  }

  async deleteMeetupById(id) {
    return this.meetupRepository.deleteMeetupById(id);
  }

  async getMeetupById(id) {
    const meetup = await this.meetupRepository.getMeetupsById(id);
    if (!meetup) {
      throw new Error(`The meetup with ID: ${id} not found`);
    }
    return meetup;
  }

  async updateAttendeesCountByMeetupId(meetupId, userId, willAttend = true) {
    await this.meetupRepository.updateAttendeesCountWithUserId(
      meetupId,
      userId,
      willAttend
    );
    const meetup = await this.meetupRepository.getMeetupsById(meetupId);

    await this.meetupRepository.updateMeetup(meetupId, meetup);

    return meetup;
  }
}

export default MeetupService;
