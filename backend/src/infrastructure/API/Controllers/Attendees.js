import { generateError } from "../../../domain/utils/helpers.js";
import AttendeeService from "../../../domain/services/AttendeeService.js";
import { attendeeSchema } from "../schemas/attendeesSchemas.js";

const attendeeService = new AttendeeService();

export const validateNewAttendee = (req, res, next) => {
  const { error } = attendeeSchema.validate(req.body);

  if (error) {
    throw generateError(error.details[0].message, 400);
  }
  next();
};

export const newAttendeeController = async (req, res, next) => {
  try {
    const { meetupId, userId } = req.body;
    await attendeeService.createOrUpdateAttendee(meetupId, userId);

    res.status(200).json({ message: "Attendee status updated successfully." });
  } catch (error) {
    next(error);
  }
};

export const listAttendeesController = async (req, res, next) => {
  try {
    const { meetupId } = req.params;
    const attendees = await attendeeService.getAttendeesByMeetup(meetupId);

    res.status(200).json(attendees);
  } catch (err) {
    next(err);
  }
};

export const updateAttendeeController = async (req, res, next) => {
  try {
    const { meetupId, userId, newWillAttend } = req.body;

    if (
      meetupId === undefined ||
      userId === undefined ||
      newWillAttend === undefined
    ) {
      throw generateError(
        "Meetup ID, User ID, and newWillAttend are required.",
        400
      );
    }

    await attendeeService.updateAttendee(meetupId, userId, newWillAttend);

    res.status(200).json({ message: "Attendee updated successfully." });
  } catch (err) {
    next(err);
  }
};

export const deleteAttendeeController = async (req, res, next) => {
  try {
    const { meetupId, userId } = req.body;

    await attendeeService.toggleAttendee(meetupId, userId);

    res.status(200).json({ message: "Attendee deleted successfully." });
  } catch (err) {
    next(err);
  }
};

export const getAttendeeByIdController = async (req, res, next) => {
  try {
    const { attendeeId } = req.params;
    const attendee = await attendeeService.getAttendeeById(attendeeId);

    if (!attendee) {
      res.status(404).json({ message: "Attendee not found." });
    } else {
      res.status(200).json(attendee);
    }
  } catch (error) {
    next(error);
  }
};
