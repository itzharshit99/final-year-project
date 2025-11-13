import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      id: {
        type: String,
        enum: ["hindi", "english", "math", "science", "computer"],
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      nameEn: {
        type: String,
        required: true,
      },
    },
    instructor: {
      type: String,
      required: true,
    },
    lessons: [
      {
        title: { type: String, required: true },
        videoUrl: { type: String, required: true },
        duration: { type: String },
        resources: [{ type: String }], 
      },
    ],
    price: {
      type: Number,
      default: 0,
    },
    language: {
      type: String,
      default: "हिंदी",
    },
    class: {
      type: String,
      enum: [
        "1st Class",
        "2nd Class",
        "3rd Class",
        "4th Class",
        "5th Class",
        "6th Class",
        "7th Class",
        "8th Class",
        "9th Class",
        "10th Class",
        "11th Class",
        "12th Class",
      ],
      required: true
    },
    rating: {
      type: Number,
      default: 0,
    },
    studentsEnrolled: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
