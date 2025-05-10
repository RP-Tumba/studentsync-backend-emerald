import express from 'express';
import {GetAllCourses} from '../controllers/course.controller.js';

const router = express.Router();

router.use("/",GetAllCourses);




export default router;