import { DomainError } from "./DomainError.js";
import { ErrorCode } from "./ErrorCode.js";

export class MeetupNotFoundError extends DomainError {
  constructor() {
    super(ErrorCode.MEETUP_NOT_FOUND, "Meetup not found");
  }
}
