import mongoose, { Schema } from "mongoose";

const resumeSchema = new Schema(
  {
    user_Id: {
      type: String,
      required: true,
    },
    resume_name: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export const ResumeModel = mongoose.model("resumes", resumeSchema);
