
import pool from "../config/db.js";

import { logger,successResponse,errorResponse } from "../utils/index.js";
 
import { createcourses } from "../models/courses.model.js";
import { response } from "express";

export const createCourseTable = async (req,res)=>{
 const create= await  createcourses();
  logger.info("table courses added");
  successResponse(res,200,create)
}



export const GetAllCourses = async (req, res) => {
  try {
    const courses = await pool.query("SELECT * FROM courses");
    logger.info("List of all courses");
  successResponse(res,200,courses.rows)
  } catch (err) {
    logger.error(err.message);
    errorResponse(err,req,res)
  }
};


export const GetCourseById = async (req, res) => {
  try {
    const id=req.params.id 
    const courses = await pool.query(`SELECT * FROM courses WHERE id=${id}`);

    logger.info("Get courses by Id");
  successResponse(res,200,courses.rows)
  
    
  
  } catch (err) {
    logger.error(err.message);
  errorResponse(err,req,res)
  }
};


export const InsertCourse = async (req, res) => {
  try {
    const {name,code,credits}=req.body 
    const courses = await pool.query(`INSERT INTO courses(name,code,credits) VALUES ('${name}','${code}','${credits}')`);
    logger.info("Insert done well");
  successResponse(res,200,courses.rows)
  } catch (err) {
    logger.error(err.message);
    errorResponse(err,req,res)
  }
};


export const DeleteCourse = async (req, res) => {
  try {
    const id = req.params.id
    const checking = await pool.query(`SELECT * FROM courses WHERE id=${id}`)
    if(checking.rowCount === 0){
      res.status(404).json({
        success:false,
        message:"id not exist in database"
      })
    }
    const courses = await pool.query(`DELETE FROM courses WHERE id=${id}`);
    
     logger.info("course deleted successfully");
     successResponse(res,200,courses.rows)
  } catch (err) {
    logger.error(err.message);
    errorResponse(err,req,res)
  }
};


export const UpdateCourse = async (req, res) => {
  try {
    const id = req.params.id
    const {name,code,credits}=req.body
      const checkin = await pool.query(`SELECT * FROM courses WHERE id=${id}`)
    if(checkin.rowCount === 0){
      res.status(404).json({
        success:false,
        message:"id not exist in database"
      })
    }
    const courses = await pool.query("UPDATE courses SET name=$1,code=$2,credits=$3 WHERE id=$4",[name,code,credits,id]);
     logger.info("Course updated successfully");
  successResponse(res,200,courses.rows)
  } catch (err) {
    logger.error(err.message);
   errorResponse(err,req,res)
  }
  }
