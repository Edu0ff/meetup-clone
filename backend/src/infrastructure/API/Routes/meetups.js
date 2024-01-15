import express from "express";
import {
  newMeetupController,
  listMeetupsController,
  updateMeetupController,
  deleteMeetupController,
  attendMeetupController,
  unattendMeetupController,
  getMeetupByIdController,
} from "../Controllers/Meetups.js";
import { authUser } from "../Middlewares/auth.js";

const meetupsRoutes = express.Router();

meetupsRoutes.post("/meetups", authUser, newMeetupController);
meetupsRoutes.delete("/meetups/:id", authUser, deleteMeetupController);
meetupsRoutes.get("/meetups/:id", authUser, getMeetupByIdController);
meetupsRoutes.get("/meetups", authUser, listMeetupsController);

export { meetupsRoutes };