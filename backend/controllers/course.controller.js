import Course from "../models/courseModel.js";

export const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res
      .status(201)
      .json({ success: true, message: "Course created Successfully", course });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

export const getAllCourse = async (req, res) => {
  try {
    const { categoryId, class: classFilter } = req.query;
    const filter = {};

    if (categoryId && categoryId !== "all") {
      filter["category.id"] = categoryId;
    }
    if (classFilter) {
      filter.class = classFilter;
    }

    const courses = await Course.find(filter).sort({ createdAt: -1 });
    // console.log(courses)
    res.status(200).json({ success: true, count: courses.length, courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res.status(200).json({ success: true, course });
  } catch (error) {
    console.error("Error fetching course:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch course",
        error: error.message,
      });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCourse) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Course updated successfully",
        course: updatedCourse,
      });
  } catch (error) {
    console.error("Error updating course:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to update course",
        error: error.message,
      });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to delete course",
        error: error.message,
      });
  }
};
