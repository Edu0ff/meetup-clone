import { DomainError } from './DomainError.js'
import { ErrorCode } from './ErrorCode.js'

export class MeetupAlreadyExistsError extends DomainError {
  constructor() {
    super(ErrorCode.MEETUP_ALREADY_EXISTS, 'Meetup already exists')
  }
}
