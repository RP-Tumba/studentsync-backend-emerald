import express from 'express';
import {createCourseTable} from '../controllers/course.controller.js';

const router = express.Router();

router.use(createCourseTable);




export default router;