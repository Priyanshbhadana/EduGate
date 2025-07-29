// backend/src/controllers/home.controller.js
import { Register } from "../models/register.model.js";
import { Student } from "../models/student.model.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// GET all student entries
const getAllStudents = asyncHandler(async (req, res) => {
  const allEntries = await Register.find({}).sort({ createdAt: -1 }).lean();

  const rollNumbers = allEntries.map(e => e.rollNo);
  const studentDetails = await Student.find({ rollNo: { $in: rollNumbers } }).lean();

  const enriched = allEntries.map(entry => {
    const student = studentDetails.find(s => s.rollNo === entry.rollNo);
    return {
      _id: entry._id, // ✅ Needed by frontend
      rollNo: entry.rollNo,
      outDateAndTime: entry.outDateAndTime,
      inDateAndTime: entry.inDateAndTime,
      createdAt: entry.createdAt,
      name: student?.name || "N/A",
      email: student?.email || "N/A",
      department: student?.department || "N/A",
      hostel: student?.hostel || "N/A",
      contact: student?.contact || "N/A"
    };
  });

  res.status(200).json(new ApiResponse(200, enriched, "All entries"));
});

// GET students currently outside (out entry done but no inDateAndTime yet)
const getOutStudents = asyncHandler(async (req, res) => {
  const outEntries = await Register.find({ inDateAndTime: null }).sort({ createdAt: -1 }).lean();

  const rollNumbers = outEntries.map(e => e.rollNo);
  const studentDetails = await Student.find({ rollNo: { $in: rollNumbers } }).lean();

  const enriched = outEntries.map(entry => {
    const student = studentDetails.find(s => s.rollNo === entry.rollNo);
    return {
      _id: entry._id,
      rollNo: entry.rollNo,
      outDateAndTime: entry.outDateAndTime,
      inDateAndTime: entry.inDateAndTime,
      createdAt: entry.createdAt,
      name: student?.name || "N/A",
      email: student?.email || "N/A",
      department: student?.department || "N/A",
      hostel: student?.hostel || "N/A",
      contact: student?.contact || "N/A"
    };
  });

  res.status(200).json(new ApiResponse(200, enriched, "Out entries only"));
});

// GET entries by date (used in filter)
const getEntriesByDate = asyncHandler(async (req, res) => {
  const { date } = req.body;

  if (!date) {
    return res.status(400).json(new ApiResponse(400, [], "Date is required"));
  }

  const startDate = new Date(date);
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 1);

  const entries = await Register.find({
    createdAt: {
      $gte: startDate,
      $lt: endDate
    }
  }).sort({ createdAt: -1 }).lean();

  const rollNumbers = entries.map(e => e.rollNo);
  const studentDetails = await Student.find({ rollNo: { $in: rollNumbers } }).lean();

  const enriched = entries.map(entry => {
    const student = studentDetails.find(s => s.rollNo === entry.rollNo);
    return {
      _id: entry._id,
      rollNo: entry.rollNo,
      outDateAndTime: entry.outDateAndTime,
      inDateAndTime: entry.inDateAndTime,
      createdAt: entry.createdAt,
      name: student?.name || "N/A",
      email: student?.email || "N/A",
      department: student?.department || "N/A",
      hostel: student?.hostel || "N/A",
      contact: student?.contact || "N/A"
    };
  });

  res.status(200).json(new ApiResponse(200, enriched, "Entries by date"));
});

export { getAllStudents, getOutStudents, getEntriesByDate };
