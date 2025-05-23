/**
 * This file serves as the main entry point for all controller functions.
 * It currently imports the `getAllStudents` function from the student controller.
 *
 * To add more controllers, import them here and export as needed.
 */
import { GetAllCourses ,GetCourseById,InsertCourse,DeleteCourse,UpdateCourse} from "./course.controller.js";
import { getAllStudents,createStudent,getStudentsbyID,updateStudentById} from "./student.controller.js";
export { getAllStudents,createStudent,getStudentsbyID,updateStudentById ,GetAllCourses,GetCourseById,InsertCourse,DeleteCourse,UpdateCourse};

