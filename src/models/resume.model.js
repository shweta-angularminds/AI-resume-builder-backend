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
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    jobTitle: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    summary: {
      type: String,
    },
    experiences: [
      {
        title: { type: String, required: false },
        companyName: { type: String, required: false },
        city: { type: String, required: false },
        state: { type: String, required: false },
        startDate: { type: Date, required: false },
        endDate: { type: Date, required: false },
        workSummary: { type: String, required: false },
      },
    ],
    educations: [
      {
        universityName: { type: String, required: false },
        degree: { type: String, required: false },
        major: { type: String, required: false },
        startDate: { type: Date, required: false },
        endDate: { type: Date, required: false },
        score: { type: String, required: false },
      },
    ],
    skills: [
      {
        name: { type: String, required: false },
        rating: { type: Number, required: false },
      },
    ],
    themeColor: {
      type: String,
      required: false,
      default: "gray",
    },
  },
  {
    timestamps: true,
  }
);

export const ResumeModel = mongoose.model("resumes", resumeSchema);
