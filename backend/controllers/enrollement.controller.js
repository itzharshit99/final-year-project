import Enrollment from "../models/enrollement.model.js";
import Course from "../models/courseModel.js";

export const enrollCourse = async (req, res) => {
  try {
    const studentId = req.student._id; // ✅ correct reference
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // check if already enrolled
    const existing = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existing) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
    });

    res.status(201).json({
      success: true,
      message: "Enrollment successful",
      enrollment,
    });
  } catch (error) {
    console.error("Enroll Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getMyCourses = async (req, res) => {
  try {
    const userId = req.user._id;
    const enrollments = await Enrollment.find({ user: userId }).populate("course");
    res.json({ success: true, courses: enrollments.map(e => e.course) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching enrolled courses" });
  }
};