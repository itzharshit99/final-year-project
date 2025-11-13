import express from "express";
import {
  createCourse,
  getAllCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = express.Router();

router.post("/",isAdmin, createCourse);
router.get("/", getAllCourse);
router.get("/:id", getCourseById);
router.put("/:id",isAdmin, updateCourse);
router.delete("/:id",isAdmin, deleteCourse);

export default router;
