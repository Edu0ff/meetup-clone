import express from "express";
import {
  newAttendeeController,
  listAttendeesController,
  deleteAttendeeController,
  getAttendeeByIdController,
} from "../Controllers/Attendees.js";
import { authUser } from "../Middlewares/auth.js";

const attendeesRoutes = express.Router();

attendeesRoutes.post("/attendees", authUser, newAttendeeController);
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
attendeesRoutes.get(
  "/attendees/:meetupId/list",
  authUser,
  listAttendeesController
);

export { attendeesRoutes };
