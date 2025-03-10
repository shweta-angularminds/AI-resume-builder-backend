import { Router } from "express";
import {
  addEducation,
  addExperience,
  addPersonalDetails,
  addSkills,
  addSummary,
  createResume,
  getAllResume,
  getResumeDetails,
  setTheme,
} from "../controllers/resume.controller.js";

const router = Router();

router.route("/create-resume").post(createResume);
router.route("/get-resume/:user_Id").get(getAllResume);
router.route("/:Id/add-personal-details").put(addPersonalDetails);
router.route("/:Id/add-summary").put(addSummary);
router.route("/:Id/add-experience").put(addExperience);
router.route("/:Id/add-Education").put(addEducation);
router.route("/:Id/add-skills").put(addSkills)
router.route("/:Id").get(getResumeDetails);
router.route("/:Id/theme").post(setTheme);

export default router;
