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


export const updateStudentById = async (req,res) =>{
 
  const id =req.params.id
  try{
    const checking =await pool.query(`SELECT * FROM students WHERE id=$1`,[id])
    if(checking.rowCount ===0){
      res.status(404).json({success:false,message:"user not found"})
}
  const {first_name, last_name, student_id, email, date_of_birth, 
  contact_number, enrollment_date,profile_picture} =req.body

  const update_query ="UPDATE students SET first_name=$1, last_name=$2, student_id=$3, email=$4, date_of_birth=$5, contact_number=$6, enrollment_date=$7,profile_picture=$8 WHERE id=$9";
  await pool.query(update_query,[first_name,last_name,student_id,email,date_of_birth,contact_number,enrollment_date,profile_picture,id])
    
  res.status(200).json({
    success: true,
    count: students.rows.length,
    data: students.rows,
  });
  

  }
  catch (err) {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred in PUT/STUDENTS, ${err?.message}`,
    });
  }

  }
