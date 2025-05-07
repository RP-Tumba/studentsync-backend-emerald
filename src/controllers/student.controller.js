/**
 * This file contains the controller functions related to student operations.
 * Currently, it includes a function to retrieve all students from the database.
 *
 * Add more functions here to handle other student-related operations (e.g., create, update, delete).
 */
import pool from "../config/db.js";
import { logger,successResponse,errorResponse } from "../utils/index.js";

export const createStudent = async (req,res) =>{
  try{
    const { first_name, last_name, student_id, email, date_of_birth, contact_number, enrollment_date } = req.body;

    const result = await pool.query(
      `INSERT INTO students (first_name, last_name, student_id, email, date_of_birth, contact_number, enrollment_date)
       VALUES ('${first_name}', '${last_name}', '${student_id}', '${email}', '${date_of_birth}', '${contact_number}', '${enrollment_date}')
       ON CONFLICT (student_id) DO NOTHING
       RETURNING *`
    );
    
    logger.info("Student inserted");
    
    return res.status(201).json({
      success: true,
    //  count: result.rows.length, // returns the number of rows affected
     // data: result.rows // returns the actual data inserted
    });
    
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
export const  getStudentsbyID = async (req, res) => {
    const student_id=req.params.student_id;
  try {
    const students = await pool.query(`SELECT * FROM students WHERE id=${student_id}`);
    // if student does not exit
    if(students.rows.length == 0 ) {
      const err = new Error("Student not found")
      err.status = 404
      errorResponse(err, req,res)
    } 
    // we used students.rows[0] to access the first student as individual not as whole array 
    // since we are basing on id of a student
    successResponse(res, 200, students.rows[0])
  } 
  catch (err) {
    logger.error(err.message);
     const ourError = new Error(`An unexpected error occurred in GET/STUDENTS, ${err?.message}`)
     ourError.status = 500
     errorResponse(ourError)
  }
};
