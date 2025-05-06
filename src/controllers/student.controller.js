/**
 * This file contains the controller functions related to student operations.
 * Currently, it includes a function to retrieve all students from the database.
 *
 * Add more functions here to handle other student-related operations (e.g., create, update, delete).
 */
import pool from "../config/db.js";
import { logger } from "../utils/index.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await pool.query("SELECT * FROM students");
    res.status(200).json({
      success: true,
      count: students.rows.length,
      data: students.rows,
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred in GET/STUDENTS, ${err?.message}`,
    });
  }
};
export const getStudentsbyID = async (req, res) => {
    const student_id=req.params.student_id;
  try {
    const students = await pool.query(`SELECT * FROM students WHERE id=${student_id}`);
    // if student does not exit
    if(students.rows.length == 0 ) return res.status(404).json({success: true, message: "Student doesn't exist"})
    
    res.status(200).json({success: true,data: students.rows, count: students.rows.length});
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred in GET/STUDENTS, ${err?.message}`,
    });
  }
};
