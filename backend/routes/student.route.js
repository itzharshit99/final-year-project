import express from "express";
import { getStudentDetails, loginStudent, registerStudent } from "../controllers/student.controller.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();
router.post("/register",registerStudent);
router.post("/login",loginStudent);
router.get("/me",protect,getStudentDetails);
export default router;