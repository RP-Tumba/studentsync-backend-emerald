
import pool from "../config/db.js";
import { errorResponse } from "../utils/responseHandlers.js";

export const createTable = async ()=>{
    try{

    const createTable_query=`CREATE TABLE IF NOT EXISTS courses 
    (id int AUTO INCREMENT,
    name VARCHAR(50) NOT NULL,
    code VARCHAR(12) NOT NULL UNIQUE,
    credits INT);`;
    const create = await pool.query(createTable_query);
    }catch(err){
        errorResponse(err,req,res);
    }

}
