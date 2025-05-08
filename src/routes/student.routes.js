/**
 * This file defines the routes related to student operations.
 * It currently includes a route to get all students.
 *
 * Add more routes for creating, updating, and deleting students as needed.
 */
import express from "express";

import { getAllStudents,createStudent, getStudentsbyID,deleteStudent, updateStudentById } 
from "../controllers/student.controller.js";

const router = express.Router();


router.get("/", getAllStudents);
router.put('/:id',updateStudentById)
router.post("/", createStudent);
router.delete('/:id', deleteStudent);
router.get("/:student_id", getStudentsbyID);

export default router;
