import express from "express";
import { enrollCourse,getMyCourses } from "../controllers/enrollement.controller.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();


router.post("/", protect, enrollCourse);
router.get("/my-courses", protect, getMyCourses);
export default router;