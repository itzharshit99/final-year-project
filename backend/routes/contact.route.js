import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
  searchContacts,
  getCategoryAnalysis,
  getCategoryDetailedReport,
  getDashboardStats,
} from "../controllers/contact.controller.js";

const router = express.Router();
// Contact routes
router.post("/", createContact);
router.get("/contacts", getAllContacts);
router.get("/contacts/search", searchContacts);
router.get("/contacts/:id", getContactById);
router.delete("/contacts/:id", deleteContact);

router.get("/analysis/category", getCategoryAnalysis);
router.get("/analysis/category/:category", getCategoryDetailedReport);
router.get("/analysis/dashboard", getDashboardStats);

export default router;
