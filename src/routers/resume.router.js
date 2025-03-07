import { Router } from "express";
import { addExperience, addPersonalDetails, addSummary, createResume, getAllResume } from "../controllers/resume.controller.js";

const router = Router();

router.route("/create-resume").post(createResume);
router.route("/get-resume/:user_Id").get(getAllResume)
router.route("/:Id/add-personal-details").put(addPersonalDetails);
router.route("/:Id/add-summary").put(addSummary);
router.route("/:Id/add-experience").put(addExperience);
export default router;
