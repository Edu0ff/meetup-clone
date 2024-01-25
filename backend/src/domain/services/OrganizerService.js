import { OrganizerRepository } from '../repository/OrganizerRepository.js'
import UserService from './UserService.js'
class OrganizerService {
  constructor() {
    this.organizerRepository = new OrganizerRepository()
    this.userService = new UserService()
  }

  async addOrganizer(user_id, meetup_id) {
    try {
      const user = await this.userService.getUserById(user_id)

      if (!user) {
        throw new Error(`User with ID: ${user_id} not found`)
      }

      const username = user.username

      await this.organizerRepository.createOrganizer(
        user_id,
        meetup_id,
        username,
      )
    } catch (error) {
      throw error
    }
  }

  async getOrganizersByMeetupId(meetupId) {
    return this.organizerRepository.getOrganizersByMeetup(meetupId)
  }

  async getOrganizerById(organizerId) {
    return await this.organizerRepository.getOrganizerById(organizerId)
  }

  async deleteOrganizer(meetup_id, user_id) {
    await this.organizerRepository.deleteOrganizer(meetup_id, user_id)
  }
}

export default OrganizerService
