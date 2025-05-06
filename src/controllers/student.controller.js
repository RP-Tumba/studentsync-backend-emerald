/**
 * This file contains the controller functions related to student operations.
 * Currently, it includes a function to retrieve all students from the database.
 *
 * Add more functions here to handle other student-related operations (e.g., create, update, delete).
 */
import pool from "../config/db.js";
import { logger } from "../utils/index.js";

export const createStudent = async (req,res) =>{
  try{
    const{first_name, last_name, student_id, email, date_of_birth, contact_number, enrollment_date} = req.body
    const result = await pool.query(`INSERT INTO students (First_Name,Last_Name,Student_ID,Email,Date_Of_Birth,Contact_Number,enrollment_date)
      VALUES ('${first_name}','${last_name}','${student_id}','${email}','${date_of_birth}','${contact_number}','${enrollment_date}')`)
      
      logger.info("Student inserted:", result.rows)

      return res.status(200).json({
        success:true,
        count : result.rows.length,
        data :result.rows

      })
  }
    catch (error) {
      logger.error(error.message);
      res.status(500).json({
        success: false,
        message: `An unexpected error occurred in POST/students, ${error?.message}`,
      });


  }
}

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
