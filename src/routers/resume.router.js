import { Router } from "express";
import { addPersonalDetails, createResume, getAllResume } from "../controllers/resume.controller.js";

const router = Router();

router.route("/create-resume").post(createResume);
router.route("/get-resume/:user_Id").get(getAllResume)
router.route("/:Id/add-personal-details").put(addPersonalDetails);


export default router;
