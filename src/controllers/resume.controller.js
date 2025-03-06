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

export { createResume, getAllResume, addPersonalDetails };
