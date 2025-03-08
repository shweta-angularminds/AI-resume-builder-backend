import { ResumeModel } from "../models/resume.model.js";

const createResume = async (req, res) => {
  console.log("called");
  try {
    const { user_Id, resume_name } = req.body;
    if (!user_Id || !resume_name) {
      res.status(400).send("User_id and resume name both required!");
    }
    const data = await ResumeModel.create({ user_Id, resume_name });
    if (!data) {
      res.status(500).send("Error to create resume");
    }

    res.status(200).send(data);
  } catch (error) {
    console.log("\n \n error\n \n", error);
    res.status(500).send(error);
  }
};

const getAllResume = async (req, res) => {
  try {
    const { user_Id } = req.params;
    console.log("User id:", user_Id);
    if (!user_Id) {
      res.status(400).send("user Id required");
    }
    const data = await ResumeModel.find({ user_Id: user_Id });
    if (!data) {
      res.status(200).send([]);
    }
    res.status(200).send(data);
  } catch (error) {
    console.log("\n Error occured while getting all resumes:", error);
    res.status(500).send(error);
  }
};

const addPersonalDetails = async (req, res) => {
  try {
    const { firstName, lastName, jobTitle, address, phone, email } = req.body;
    const { Id } = req.params;
    if (!firstName || !lastName || !jobTitle || !address || !phone || !email) {
      res.status(400).send("All fields are required!");
    }

    const data = await ResumeModel.findByIdAndUpdate(
      Id,
      {
        firstName,
        lastName,
        jobTitle,
        address,
        phone,
        email,
      },
      {
        new: true,
      }
    );
    if (!data) {
      res.status(500).send("error while updating data");
    }

    res.status(200).json({ message: "Updated Succesfully!", data });
  } catch (error) {
    res.status(500).send(error);
    console.log("\n Error occured while adding personal details\n ", error);
  }
};

const addSummary = async (req, res) => {
  try {
    const { summary } = req.body;
    const { Id } = req.params;

    if (!summary) {
      res.status(400).send("summary is required!");
    }

    const data = await ResumeModel.findByIdAndUpdate(
      Id,
      { summary },
      { new: true }
    );
    if (!data) {
      res.status(500).send("error to update summary!");
    }
    res.status(200).send(data);
  } catch (error) {
    console.log("\n \n Error while adding summary, \n ", error);
    res.status(500).send(error);
  }
};

const addExperience = async (req, res) => {
  try {
    const { experiences } = req.body;
    const { Id } = req.params;

    if (!experiences || !Array.isArray(experiences)) {
      return res.status(400).send("Experiences should be an array.");
    }

    for (let exp of experiences) {
      const {
        city,
        companyName,
        endDate,
        startDate,
        state,
        title,
        workSummary,
      } = exp;

      if (
        !city ||
        !companyName ||
        !endDate ||
        !startDate ||
        !state ||
        !title ||
        !workSummary
      ) {
        return res
          .status(400)
          .send("All fields are required for each experience!");
      }
    }

    const resume = await ResumeModel.findById(Id);

    if (!resume) {
      return res.status(404).send("Resume not found!");
    }

    resume.experiences = experiences;

    await resume.save();

    return res.status(200).send("Experiences updated successfully!");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
const addEducation = async (req, res) => {
  try {
    const { educations } = req.body;
    const { Id } = req.params;

    if (!educations || !Array.isArray(educations)) {
      return res.status(400).send("Educations should be an array.");
    }

    for (let edu of educations) {
      const { universityName, degree, major, startDate, endDate, score } = edu;

      if (
        !universityName ||
        !degree ||
        !major ||
        !startDate ||
        !endDate ||
        !score
      ) {
        return res
          .status(400)
          .send("All fields are required for each education!");
      }
    }

    const resume = await ResumeModel.findById(Id);

    if (!resume) {
      return res.status(404).send("Resume not found!");
    }

    resume.educations = educations;

    await resume.save();

    return res.status(200).send("educations updated successfully!");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export {
  createResume,
  getAllResume,
  addPersonalDetails,
  addSummary,
  addExperience,
  addEducation,
};
