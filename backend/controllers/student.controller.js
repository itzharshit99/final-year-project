import Student from "../models/studentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    console.error("Error registering student", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });
    const user = await Student.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};


export const getStudentDetails = async (req, res) => {
  try {
    const student = req.student;
    res.status(200).json({
      message: "Student details fetched successfully",
      student,
    });
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};