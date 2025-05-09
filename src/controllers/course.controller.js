
import pool from "../config/db.js";

import { logger,successResponse,errorResponse } from "../utils/index.js";
 
import { createTable } from "../models/student.model.js";

export const createCourseTable = async (req,res)=>{
 const create= await  createTable();
  logger.info("table courses added");
  successResponse(res,200,create)
}