import UserRepositoryMock from './UserRepositoryMock.js'
import { describe, beforeEach, expect, it } from 'vitest'

describe('UserRepositoryMock', () => {
  let userRepositoryMock

  beforeEach(() => {
    userRepositoryMock = new UserRepositoryMock()
  })

  it('should create a new user', async () => {
    const newUser = await userRepositoryMock.createUser({
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      category: 'usuario',
      name: 'John',
      last_name: 'Doe',
      bio: 'A brief bio',
      avatar: 'avatar.jpg',
      meetups_attended: 0,
    })

    expect(newUser).toBeDefined()
    expect(newUser.username).toBe('john_doe')
    expect(newUser.email).toBe('john@example.com')
    expect(newUser.category).toBe('usuario')
    expect(newUser.name).toBe('John')
    expect(newUser.last_name).toBe('Doe')
    expect(newUser.bio).toBe('A brief bio')
    expect(newUser.avatar).toBe('avatar.jpg')
    expect(newUser.meetups_attended).toBe(0)
  })

  it('should throw an error when creating a user with an invalid category', async () => {
    await expect(
      userRepositoryMock.createUser({
        username: 'alice_smith',
        email: 'alice@example.com',
        password: 'secure123',
        category: 'invalid_category',
        name: 'John',
        last_name: 'Doe',
        bio: 'A brief bio',
        avatar: 'avatar.jpg',
        meetups_attended: 0,
      }),
    ).rejects.toThrow('The category only can be "usuario" or "administrador')
  })

  it('should log in a user with valid credentials', async () => {
    userRepositoryMock.createUser({
      username: 'alice_smith',
      email: 'alice@example.com',
      password: 'secure123',
      category: 'administrador',
    })

    const { user, token } = await userRepositoryMock.login(
      'alice@example.com',
      'secure123',
    )

    expect(user).toBeDefined()
    expect(user.email).toBe('alice@example.com')
    expect(token).toBeDefined()
  })

  it('should throw an error when logging in with invalid credentials', async () => {
    await expect(
      userRepositoryMock.login('nonexistent@example.com', 'invalid_password'),
    ).rejects.toThrow('Invalid credentials')
  })
  it('should get a user by email', async () => {
    const userRepositoryMock = new UserRepositoryMock()

    const user = {
      username: 'alice_smith',
      email: 'alice@example.com',
      password: 'secure123',
      category: 'usuario',
      name: 'John',
      last_name: 'Doe',
      bio: 'A brief bio',
      avatar: 'avatar.jpg',
      meetups_attended: 0,
    }

    await userRepositoryMock.createUser(user)

    const retrievedUser = await userRepositoryMock.getUserByEmail(user.email)

    expect(retrievedUser).toEqual(user)
  })

  it('should throw an error when getting a user by email that does not exist', async () => {
    const userRepositoryMock = new UserRepositoryMock()

    await expect(
      userRepositoryMock.getUserByEmail('invalid@email.com'),
    ).rejects.toThrowError('User not found')
  })

  it('should get a user by id', async () => {
    const userRepositoryMock = new UserRepositoryMock()

    const user = {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      category: 'usuario',
      name: 'John',
      last_name: 'Doe',
      bio: 'A brief bio',
      avatar: 'avatar.jpg',
      meetups_attended: 0,
    }

    const createdUser = await userRepositoryMock.createUser(user)

    const retrievedUser = await userRepositoryMock.getUserById(createdUser.id)

    expect(retrievedUser).toEqual(createdUser)
  })

  it('should throw an error when getting a user by id that does not exist', async () => {
    const userRepositoryMock = new UserRepositoryMock()

    await expect(
      userRepositoryMock.getUserById('invalid-id'),
    ).rejects.toThrowError('User not found')
  })

  it('should update a user', async () => {
    const userRepositoryMock = new UserRepositoryMock()

    const user = {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      category: 'usuario',
      name: 'John',
      last_name: 'Doe',
      bio: 'A brief bio',
      avatar: 'avatar.jpg',
      meetups_attended: 0,
    }

    const createdUser = await userRepositoryMock.createUser(user)

    const updatedUser = {
      ...createdUser,
      name: 'Jane Doe',
    }

    await userRepositoryMock.updateUser(createdUser.id, updatedUser)

    const retrievedUser = await userRepositoryMock.getUserById(createdUser.id)

    expect(retrievedUser).toEqual(updatedUser)
  })

  it('should throw an error when updating a user that does not exist', async () => {
    const userRepositoryMock = new UserRepositoryMock()
    await expect(
      userRepositoryMock.updateUser('invalid-id', { name: 'Jane Doe' }),
    ).rejects.toThrowError('User not found')
  })

  it('Should delete a user', async () => {
    const userRepositoryMock = new UserRepositoryMock()
    const user = {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
      category: 'usuario',
      name: 'John',
      last_name: 'Doe',
      bio: 'A brief bio',
      avatar: 'avatar.jpg',
      meetups_attended: 0,
    }
    const createdUser = await userRepositoryMock.createUser(user)
    await userRepositoryMock.deleteUser(createdUser.id)
    await expect(
      userRepositoryMock.getUserById(createdUser.id),
    ).rejects.toThrowError('User not found')
  })
  it('Should throw an error when deleting a user that does not exist', async () => {
    const userRepositoryMock = new UserRepositoryMock()
    await expect(
      userRepositoryMock.deleteUser('invalid-id'),
    ).rejects.toThrowError('User not found')
  })
})
