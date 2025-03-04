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
  },
  {
    timestamps: true,
  }
);
export const ResumeModel = mongoose.model("resumes", resumeSchema);
