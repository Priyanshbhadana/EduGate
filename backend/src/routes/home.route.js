// backend/src/routes/home.route.js

import { Router } from "express";
import {
  getAllStudents,
  getOutStudents,
  getEntriesByDate,
} from "../controllers/home.controller.js";

const router = Router();

router.get("/get-students", getAllStudents);         // ✅ FIXED
router.get("/get-out-students", getOutStudents);
router.post("/get-entries-by-date", getEntriesByDate); // ✅ FIXED to POST

export default router;
