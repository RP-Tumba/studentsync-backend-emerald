
import pool from "../config/db.js";

import { errorResponse, successResponse } from "../utils/responseHandlers.js";

export const createcourses = async (req,res) => {
    try {
        const createTable_query = `
            CREATE TABLE IF NOT EXISTS courses (
              id SERIAL PRIMARY KEY,
              name VARCHAR(50) NOT NULL,
              code VARCHAR(12) NOT NULL UNIQUE,
              credits INT
            );
        `;
        await pool.query(createTable_query);
        const insert_query = `
        INSERT INTO courses (name, code, credits) 
        VALUES ('Backend development', 'BD63234', 32)
    `;
    const insert =await pool.query(insert_query);
   
    successResponse(res,200,insert_query.rows)

    } catch (err) {
        console.error(" Error in creating table:", err.message);
    }
};

