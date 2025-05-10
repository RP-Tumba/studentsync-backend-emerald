
import pool from "../config/db.js";

import { logger,successResponse,errorResponse } from "../utils/index.js";
 
import { createcourses } from "../models/student.model.js";

export const createCourseTable = async (req,res)=>{
 const create= await  createcourses();
  logger.info("table courses added");
  successResponse(res,200,create)
}
export const GetAllCourses = async (req, res) => {
  try {
    const students = await pool.query("SELECT * FROM courses");
    res.status(200).json({
      success: true,
      count: students.rows.length,
      data: students.rows,
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred in GET/courses, ${err?.message}`,
    });
  }
};
