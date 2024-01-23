import { describe, expect, it } from 'vitest'
import { User } from './User'

describe('User class', () => {
  it('should create a user instance with valid parameters', () => {
    const user = User.create(
      'user_id',
      'username',
      'this is a bio',
      'john@example.com',
      'password123',
      10,
      'avatar.jpg',
    )

    expect(user).toBeInstanceOf(User)
    expect(user.getId()).toEqual('user_id')
    expect(user.hasEmail('john@example.com')).toBe(true)
    expect(user.hasEmail('jane@example.com')).toBe(false)
    expect(user.hasPassword('password123')).toBe(true)
    expect(user.hasPassword('wrongpassword')).toBe(false)
    expect(user.hasMeetupsAttended(10)).toBe(true)
    expect(user.hasAvatar('avatar.jpg')).toBe(true)
  })
})
