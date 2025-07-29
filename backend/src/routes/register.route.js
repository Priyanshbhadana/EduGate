import { Router } from "express";
import {
  createInEntry,
  createOutEntry
} from "../controllers/register.controller.js";

const router = Router();

// POST: Student exits the campus
router.post("/create-out-entry", createOutEntry);

// PATCH: Student re-enters the campus
router.patch("/create-in-entry", createInEntry);

export default router;
