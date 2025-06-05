import mongoose from "mongoose";

const studentRegistrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

export const studentRegistration =
  mongoose.models.studentRegistration ||
  mongoose.model("studentRegistration", studentRegistrationSchema);
