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
    experiences: [
      {
        title: { type: String, required: true },
        companyName: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        workSummary: { type: String, required: true },
      },
    ],
    educations: [
      {
        universityName: { type: String, required: true },
        degree: { type: String, required: true },
        major: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        score: { type: String, required: true },
      },
    ],
    skills: [
      {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ResumeModel = mongoose.model("resumes", resumeSchema);
