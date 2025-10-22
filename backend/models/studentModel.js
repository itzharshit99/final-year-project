import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fathersName: { type: String, required: true },
  mothersName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  currentClass: { type: String, required: true },
  school: { type: String, required: true },
  medium: { type: String, required: true },
  termsAccepted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
