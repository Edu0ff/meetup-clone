import { generateError } from "../../../domain/utils/helpers.js";
import MeetupService from "../../../domain/services/MeetupService.js";
import { meetupSchema } from "../schemas/meetupsSchemas.js";

const meetupService = new MeetupService();

export const validateNewMeetup = (req, res, next) => {
  const { error } = meetupSchema.validate(req.body);

  if (error) {
    throw generateError(error.details[0].message, 400);
  }
  next();
};

export const newMeetupController = async (req, res, next) => {
  try {
    const meetupId = await meetupService.createMeetup(req.body);
    res.status(200).json({ message: "Meetup created successfully", meetupId });
  } catch (error) {
    next(error);
  }
};

export const listMeetupsController = async (req, res, next) => {
  try {
    const meetups = await meetupService.listMeetups();
    res.status(200).json(meetups);
  } catch (err) {
    next(err);
  }
};

export const updateMeetupController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const meetupData = req.body;

    await meetupService.updateMeetupById(id, meetupData);

    res.status(200).json({ message: "Meetup updated successfully." });
  } catch (err) {
    next(err);
  }
};

export const deleteMeetupController = async (req, res, next) => {
  try {
    const { id } = req.params;

    await meetupService.deleteMeetupById(id);

    res.status(200).json({ message: "Meetup deleted successfully." });
  } catch (err) {
    next(err);
  }
};

export const getMeetupByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const meetup = await meetupService.getMeetupById(id);

    if (!meetup) {
      res.status(404).json({ message: "Meetup not found." });
    } else {
      res.status(200).json(meetup);
    }
  } catch (error) {
    next(error);
  }
};
