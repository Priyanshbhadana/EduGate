import { Register } from "../models/register.model.js";
import { Student } from "../models/student.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";

const createOutEntry = asyncHandler(async (req, res) => {
    const rollNo = req.body.rollNo?.trim();
    console.log("OUT ENTRY BODY rollNo:", rollNo);

    if (!rollNo) {
        return res.status(400).json(new ApiResponse(400, "", "Roll number is required"));
    }

    const userExist = await Student.findOne({
        rollNo: { $regex: `^${rollNo}$`, $options: "i" }
    });

    if (!userExist) {
        return res.status(404).json(
            new ApiResponse(404, "", `No student found || Roll No: ${rollNo}`)
        );
    }

    const existingOutEntry = await Register.findOne({
        rollNo: { $regex: `^${rollNo}$`, $options: "i" },
        inDateAndTime: ""
    });

    if (existingOutEntry) {
        return res.status(400).json(
            new ApiResponse(400, "", `Student already out || Roll No: ${rollNo}`)
        );
    }

    const outEntry = await Register.create({ rollNo: userExist.rollNo });

    if (!outEntry) {
        throw new ApiError(500, "Out entry failed");
    }

    return res.status(200).json(
        new ApiResponse(200, "", `Out entry created || Roll No: ${userExist.rollNo}`)
    );
});

const createInEntry = asyncHandler(async (req, res) => {
    const rollNo = req.body.rollNo?.trim();
    console.log("IN ENTRY BODY rollNo:", rollNo);

    if (!rollNo) {
        return res.status(400).json(new ApiResponse(400, "", "Roll number is required"));
    }

    const userExist = await Student.findOne({
        rollNo: { $regex: `^${rollNo}$`, $options: "i" }
    });

    if (!userExist) {
        return res.status(404).json(
            new ApiResponse(404, "", `No student found || Roll No: ${rollNo}`)
        );
    }

    const existingOutEntry = await Register.findOne({
        rollNo: { $regex: `^${rollNo}$`, $options: "i" },
        inDateAndTime: ""
    });

    if (!existingOutEntry) {
        return res.status(400).json(
            new ApiResponse(400, "", `No out entry found || Roll No: ${rollNo}`)
        );
    }

    const inEntry = await Register.findOneAndUpdate(
        {
            rollNo: { $regex: `^${rollNo}$`, $options: "i" },
            inDateAndTime: ""
        },
        { inDateAndTime: Date.now() }
    );

    if (!inEntry) {
        throw new ApiError(500, "In entry failed");
    }

    return res.status(200).json(
        new ApiResponse(200, "", `In entry created || Roll No: ${userExist.rollNo}`)
    );
});

export { createOutEntry, createInEntry };
