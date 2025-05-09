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
      const { first_name, last_name, student_id, 
      email, date_of_birth, contact_number, 
      enrollment_date } = req.body;

    const result = await pool.query(
      `INSERT INTO students (first_name, last_name, student_id, email, date_of_birth, contact_number, enrollment_date)
       VALUES ('${first_name}', '${last_name}', '${student_id}', '${email}', '${date_of_birth}', '${contact_number}', '${enrollment_date}')
       ON CONFLICT (student_id) DO NOTHING
       RETURNING *`
    );
     
    logger.info("Student inserted");
    
    successResponse(res,201,result.rows)

  }
    catch (error) {
      logger.error(error.message);
      errorResponse(error,req,res)
  }
}

export const deleteStudent = async(req, res)=>{

  try{
    const { id } = req.params;
   
    const delete_query = `DELETE FROM students where student_id = $1 RETURNING*`;
    const result = await pool.query(delete_query,[id]);
    if(result.rowCount == 0 ) {
      const err = new Error("Student not found")
      err.status = 404
      errorResponse(err, req,res)
    } else{
   
      successResponse(res,200,result.rows[0])

    }
   
    
  }catch(err){
   
    errorResponse(err,req,res);
    

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
    successResponse(res, 200, students.rows[0])
  } 
  catch (err) {
    logger.error(err.message);
     const ourError = new Error(`An unexpected error occurred in GET/STUDENTS, ${err?.message}`)
     ourError.status = 500
     errorResponse(ourError)
  }

};


export const updateStudentById = async (req,res) =>{
 
  const id =req.params.id
  try{
    const checking =await pool.query(`SELECT * FROM students WHERE id=$1`,[id])
    if(checking.rowCount ===0){
       return res.status(404).json({success:false,message:"user not found"})
}
  const {first_name, last_name, student_id, email, date_of_birth, 
  contact_number, enrollment_date,profile_picture} =req.body

  const update_query ="UPDATE students SET first_name=$1, last_name=$2, student_id=$3, email=$4, date_of_birth=$5, contact_number=$6, enrollment_date=$7,profile_picture=$8 WHERE id=$9";
   const final = await pool.query(update_query,[first_name,last_name,student_id,email,date_of_birth,contact_number,enrollment_date,profile_picture,id])
    
   logger.info("Student updated");
    
    successResponse(res,201,final.rows)
  

  }
  catch (error) {
    logger.error(error.message);
    errorResponse(error,req,res)
}
}

