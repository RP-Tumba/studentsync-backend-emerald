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
    const students = req.body;

    if (!Array.isArray(students) || students.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Request body must be a non-empty array of students"
      });
    }
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

export const deleteStudent = async(req, res)=>{

  try{
    const { id } = req.params;
    const delete_query = `DELETE FROM students where student_id = $1`;
    const result = await pool.query(delete_query,[id]);
    if(result.rowCount===0){
      return res.status(200).json({
        success:false, 
        message: `Student with ID ${id} is not found.`,

      })
    logger.info(`user ${id} not found`);
    }else{
      return res.status(200).json({
        success:true, 
        message: `Student with ID ${id} deleted successfully.`,

      })
      logger.info(`user of ${id} deleted successfully`);

    }
  }catch(err){
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: `An unexpected error occured in GET/STUDENTS, ${err?.message}`,
    })
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
