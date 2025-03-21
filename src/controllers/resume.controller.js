import { ResumeModel } from "../models/resume.model.js";

const createResume = async (req, res) => {
  console.log("called");
  try {
    // Destructure user_Id and resume_name from the request body
    const { user_Id, resume_name } = req.body;

    // Check if user_Id or resume_name is missing
    if (!user_Id || !resume_name) {
      return res.status(400).send("User_id and resume name both required!"); // Return response immediately
    }

    // Create the resume document with only user_Id and resume_name
    const data = await ResumeModel.create({
      user_Id,
      resume_name,
    });

    // Check if resume creation was successful
    if (!data) {
      return res.status(500).send("Error creating resume"); // Return response immediately
    }

    // Send the created resume data as response
    return res.status(200).send(data); // Return response immediately
  } catch (error) {
    console.log("\n \n error\n \n", error);
    // Send error response if any error occurs
    return res.status(500).send(error.message || "Internal Server Error"); // Return response immediately
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

const addProjects = async (req, res) => {
  try {
    const { projects } = req.body;
    const { Id } = req.params;

    if (!projects || !Array.isArray(projects)) {
      return res.status(400).send("projects should be an array.");
    }

    for (let project of projects) {
      const {
        title,desc
      } = project;

      if (
        !title||!desc
      ) {
        return res
          .status(400)
          .send("All fields are required for each projects!");
      }
    }

    const resume = await ResumeModel.findById(Id);

    if (!resume) {
      return res.status(404).send("Resume not found!");
    }

    resume.projects = projects;

    await resume.save();

    return res.status(200).send("Projects updated successfully!");
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

const addSkills = async (req, res) => {
  try {
    const { skills } = req.body;
    const { Id } = req.params;

    if (!skills || !Array.isArray(skills)) {
      return res.status(400).send("skills should be an array.");
    }

    for (let skill of skills) {
      const { name, rating } = skill;

      if (!name || !rating) {
        return res.status(400).send("All fields are required for each skills!");
      }
    }

    const resume = await ResumeModel.findById(Id);

    if (!resume) {
      return res.status(404).send("Resume not found!");
    }

    resume.skills = skills;

    await resume.save();

    return res.status(200).send("skills updated successfully!");
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getResumeDetails = async (req, res) => {
  try {
    const { Id } = req.params;
    if (!Id) {
      res.status(400).send("Resume Id is required!");
    }
    const data = await ResumeModel.findById(Id);
    if (!data) {
      res.status(400).send("ID is not valid");
    }
    res.status(200).send(data);
  } catch (error) {
    console.log("\n Error occured while getting resume details:\n", error);
    res.status(500).send(error);
  }
};

const setTheme = async (req, res) => {
  try {
    const { Id } = req.params;
    const { themeColor } = req.body;
    console.log(themeColor);

    if (!Id) {
      return res.status(400).send("ID is required!"); // Return here to stop further execution
    }

    if (!themeColor) {
      return res.status(400).send("Theme color is required!"); // Additional validation
    }

    const data = await ResumeModel.findByIdAndUpdate(
      Id,
      { themeColor },
      { new: true }
    );

    if (!data) {
      return res.status(404).send("Resume not found"); // Changed to 404 as it's a 'not found' situation
    }

    res.status(200).json({
      message: "Theme color updated successfully",
      data: data,
    }); // Sending a meaningful response
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Server error occurred while updating the theme color");
  }
};

const deleteResume = async (req, res) => {
  try {
    console.log("In delete");
    const { Id } = req.params;
    if (!Id) {
      res.send(400).send("Resume ID is required!");
    }

    const response = await ResumeModel.findByIdAndDelete(Id);
    if (!response) {
      res.status(500).send("Error to delete resume!");
    }
    res.status(200).send("Resume deleted Succesfully!");
  } catch (error) {
    console.log("\n Error occured while trying to delete resume:\n ", error);
    res.status(500).send(error);
  }
};

const renameResume = async (req, res) => {
  try {
    const { resumeTitle } = req.body;
    const { Id } = req.params;
    console.log(resumeTitle);
    if (!resumeTitle) {
      res.status(400).send("Resume Title is required!");
    }
    if (!Id) {
      res.status(400).send("Resume Id is required!");
    }
    const response = await ResumeModel.findByIdAndUpdate(
      Id,
      { resume_name: resumeTitle },
      { new: true }
    );
    if (!response) {
      res.status(500).send("Internal server Error");
    }
    res.status(200).send("Renamed successfully!");
  } catch (error) {
    console.log("Error occured while renaming resume:\n ", error);
    res.status(500).send(error);
  }
};

export {
  createResume,
  getAllResume,
  addPersonalDetails,
  addSummary,
  addExperience,
  addProjects,
  addEducation,
  addSkills,
  getResumeDetails,
  setTheme,
  deleteResume,
  renameResume,
};
