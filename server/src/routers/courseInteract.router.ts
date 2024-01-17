import express from "express";
import {
  createCourseInteract,
  updateInteractEndTime,
  updateInteractPageView,
  updateInteractionPageView,
  updateTimeSpent,
} from "../controllers/courseInteract.controller";

const router = express.Router();

router.post("/logInteraction", createCourseInteract);

router.put("/updateInteractEndTime/:id", updateInteractEndTime);

router.put("/updateInteractPageView/:id", updateInteractPageView);

router.put("/updateInteractionPageView/:id", updateInteractionPageView);

router.put("/updateTimeSpent/:id", updateTimeSpent);

export default router;
