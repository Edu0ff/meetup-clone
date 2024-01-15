import { updateAttendeesCount } from "../../domain/utils/updateAttendeesCount.js";
import { MeetupRepository } from "../repository/MeetupRepository.js";

class MeetupService {
  constructor() {
    this.meetupRepository = new MeetupRepository();
  }

  async createMeetup({
    title,
    picture,
    theme,
    location,
    date,
    time,
    attendeesCount,
  }) {
    if (
      !title ||
      !picture ||
      !theme ||
      !location ||
      !date ||
      !time ||
      !attendeesCount
    ) {
      throw new Error("Please provide all required meetup information.");
    }

    const meetupData = {
      title,
      picture,
      theme,
      location,
      date,
      time,
      attendeesCount,
    };

    const meetupId = await this.meetupRepository.createMeetup(meetupData);

    return meetupId;
  }

  async listMeetups() {
    return this.meetupRepository.listMeetups();
  }

  async updateMeetupById(id, meetupData) {
    const meetup = await this.meetupRepository.getMeetupById(id);
    const updatedMeetup = { ...meetup, ...meetupData };
    return this.meetupRepository.updateMeetupById(id, updatedMeetup);
  }

  async deleteMeetupById(id) {
    return this.meetupRepository.deleteMeetupById(id);
  }

  async attendMeetup(meetupId, userId) {
    const meetup = await this.meetupRepository.getMeetupsById(meetupId);
    updateAttendeesCount(meetup, userId, true);
    return this.meetupRepository.updateMeetup(meetupId, meetup);
  }

  async unattendMeetup(meetupId, userId) {
    const meetup = await this.meetupRepository.getMeetupsById(meetupId);
    updateAttendeesCount(meetup, userId, false);
    return this.meetupRepository.updateMeetup(meetupId, meetup);
  }

  async getMeetupById(id) {
    const meetup = await this.meetupRepository.getMeetupById(id);
    if (!meetup) {
      throw new Error(`The meetup with ID: ${id} not found`);
    }
    return meetup;
  }
}

export default MeetupService;
