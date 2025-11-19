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
        videoUrl: { type: String },
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
