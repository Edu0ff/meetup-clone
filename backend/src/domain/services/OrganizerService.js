import { OrganizerRepository } from '../repository/OrganizerRepository.js'
class OrganizerService {
  constructor() {
    this.organizerRepository = new OrganizerRepository()
  }

  async addOrganizer(user_id, meetup_id) {
    try {
      await this.organizerRepository.createOrganizer(user_id, meetup_id)
    } catch (error) {
      throw error
    }
  }

  async getOrganizersByMeetup(meetup_id) {
    return await this.organizerRepository.getOrganizersByMeetup(meetup_id)
  }

  async getOrganizerById(organizerId) {
    return await this.organizerRepository.getOrganizerById(organizerId)
  }

  async deleteOrganizer(meetup_id, user_id) {
    await this.organizerRepository.deleteOrganizer(meetup_id, user_id)
  }
}

export default OrganizerService
