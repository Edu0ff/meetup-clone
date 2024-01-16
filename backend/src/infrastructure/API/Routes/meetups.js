import express from "express";
import {
  newMeetupController,
  listMeetupsController,
  updateMeetupController,
  deleteMeetupController,
  getMeetupByIdController,
  updateAttendeesCountController,
} from "../Controllers/Meetups.js";
import { authUser } from "../Middlewares/auth.js";

const meetupsRoutes = express.Router();

meetupsRoutes.post("/meetups", authUser, newMeetupController);
meetupsRoutes.delete("/meetups/:id", authUser, deleteMeetupController);
meetupsRoutes.get("/meetups/:id", authUser, getMeetupByIdController);
meetupsRoutes.put("/meetups/:id", authUser, updateMeetupController);
meetupsRoutes.get("/meetups", authUser, listMeetupsController);
meetupsRoutes.put(
  "/meetups/:meetupId/updateAttendeesCount",
  authUser,
  updateAttendeesCountController
);

export { meetupsRoutes };
