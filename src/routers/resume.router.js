import { Router } from "express";
import { createResume, getAllResume } from "../controllers/resume.controller.js";

const router = Router();

router.route("/create-resume").post(createResume);
router.route("/get-resume/:user_Id").get(getAllResume)

export default router;
