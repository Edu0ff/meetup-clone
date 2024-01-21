import express from "express";
import {
  newAttendeeController,
  listAttendeesController,
  updateAttendeeController,
  deleteAttendeeController,
  getAttendeeByIdController,
} from "../Controllers/Attendees.js";
import { authUser } from "../Middlewares/auth.js";

const attendeesRoutes = express.Router();

attendeesRoutes.post("/attendees", /* authUser, */ newAttendeeController);
attendeesRoutes.delete(
  "/attendees/:attendeeId",
  authUser,
  deleteAttendeeController
);
attendeesRoutes.get(
  "/attendees/:attendeeId",
  authUser,
  getAttendeeByIdController
);
attendeesRoutes.put(
  "/attendees/:attendeeId",
  authUser,
  updateAttendeeController
);
attendeesRoutes.get(
  "/attendees/:meetupId/list",
  authUser,
  listAttendeesController
);

export { attendeesRoutes };
