
import pool from "../config/db.js";

import { logger,successResponse,errorResponse } from "../utils/index.js";
 
import { createcourses } from "../models/courses.model.js";

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
export const GetCourseById = async (req, res) => {
  try {
    const {id}=req.body 
    const students = await pool.query(`SELECT * FROM courses WHERE id=${id}`);
    res.status(200).json({
      success: true,
      count: students.rows.length,
      data: students.rows,
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred in GET/courses By Id, ${err?.message}`,
    });
  }
};
export const InsertCourse = async (req, res) => {
  try {
    const {name,code,credits}=req.body 
    const students = await pool.query(`INSERT INTO courses(name,code,credits) VALUES ('${name}','${code}','${credits}')`);
    res.status(200).json({
      success: true,
      message: "Course Inserted..."
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred in POST/COURSE TABLE, ${err?.message}`,
    });
  }
};
export const DeleteCourse = async (req, res) => {
  try {
    const id = req.params.id
    const students = await pool.query(`DELETE FROM courses WHERE id=${id}`);
    res.status(200).json({
      success: true,
      message: "Course Deleted now..."
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred in Delete/COURSE , ${err?.message}`,
    });
  }
};
export const UpdateCourse = async (req, res) => {
  try {
    
    const {id,name,code,credits}=req.body
    const students = await pool.query("UPDATE courses SET name=$1,code=$2,credits=$3 WHERE id=$4",[name,code,credits,id]);
    res.status(200).json({
      success: true,
      message: "Course Updated Successfull"
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      success: false,
      message: `An unexpected error occurred in Update/COURSE , ${err?.message}`,
    });
  }
};
