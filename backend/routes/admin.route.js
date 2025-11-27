import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdminAnalytics,
  getCourseAnalytics,
  getCategoryAnalytics,
  getDashboardSummary,
} from "../controllers/admin.controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const router = express.Router();
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get('/analytics',isAdmin, getAdminAnalytics);
router.get('/analytics/course/:courseId',isAdmin, getCourseAnalytics);
router.get('/analytics/category/:category',isAdmin, getCategoryAnalytics);
router.get('/dashboard/summary',isAdmin, getDashboardSummary);

export default router;
