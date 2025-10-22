import Student from "../models/studentModel.js";
import bcrypt from "bcrypt";

export const registerStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      fathersName,
      mothersName,
      email,
      mobile,
      password,
      confirmPassword,
      dateOfBirth,
      gender,
      state,
      city,
      pincode,
      currentClass,
      school,
      medium,
      termsAccepted,
    } = req.body;

    if (!email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password not matching" });
    }

    const existingUser = await Student.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = await Student.create({
      firstName,
      lastName,
      fathersName,
      mothersName,
      email,
      mobile,
      password: hashedPassword,
      dateOfBirth,
      gender,
      state,
      city,
      pincode,
      currentClass,
      school,
      medium,
      termsAccepted,
    });

    res
      .status(201)
      .json({ message: "Student registered successfully", student });
  } catch (error) {
    console.error("Error registering student",error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
