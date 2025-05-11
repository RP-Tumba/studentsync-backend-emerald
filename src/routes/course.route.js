import express from 'express';
import {GetAllCourses,GetCourseById,InsertCourse,DeleteCourse,UpdateCourse} from '../controllers/course.controller.js';

const router = express.Router();

router.get("/",GetAllCourses);
router.get("/:id",GetAllCourses);
router.post("/",InsertCourse);
router.delete("/:id",DeleteCourse);
router.put("/:id",UpdateCourse);



export default router;