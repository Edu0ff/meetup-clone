import { UserRepository } from "../repository/UserRepository.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser({
    username,
    name,
    last_name,
    category,
    bio,
    email,
    password,
    meetups_attended,
    avatar,
  }) {
    return this.userRepository.createUser({
      username,
      name,
      last_name,
      category,
      bio,
      email,
      password,
      meetups_attended,
      avatar,
    });
  }

  async login(email, password) {
    return this.userRepository.login(email, password);
  }

  async getUserbyName(name) {
    return this.userRepository.getUserbyName(name);
  }

  async getUserByUserName(username) {
    return this.userRepository.getUserByUserName(username);
  }

  async getUserByLastName(last_name) {
    return this.userRepository.getUserByLastName(last_name);
  }

  async getUserById(userId) {
    return this.userRepository.getUserById(userId);
  }

  async getUserByEmail(email) {
    return this.userRepository.getUserByEmail(email);
  }

  async getUsersByCategory(category) {
    return this.userRepository.getUsersByCategory(category);
  }

  async getUsersByMeetupsAttended(meetups_attended) {
    return this.userRepository.getUsersByMeetups_attended(meetups_attended);
  }
}

export default UserService;
