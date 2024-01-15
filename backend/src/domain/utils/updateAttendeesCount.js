export function updateAttendeesCount(meetup, willAttend = true) {
  if (willAttend) {
    meetup.attendees_count += 1;
  } else {
    if (meetup.attendees_count > 0) {
      meetup.attendees_count -= 1;
    }
  }
}
