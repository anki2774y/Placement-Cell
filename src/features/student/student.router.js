// Manage routes/paths to StudentController 

// 1. Import express.
import express from 'express';
import StudentController from './student.controller.js';

// 2. Initialize Express router 
const studentRouter = express.Router();

const studentController = new StudentController();

// All the paths to controller methods.


studentRouter.get(
    '/home',
    (req, res) => {
        studentController.getHome(req, res)
    }
)

studentRouter.get(
    '/studentList',
    (req, res) => {
        studentController.getStudentList(req, res)
    }
)

studentRouter.post(
    '/studentList',
    (req, res) => {
        studentController.postNewStudent(req, res)
    }
)

studentRouter.delete(
    '/students/:id',
    (req, res) => {
        studentController.deleteStudent(req, res)
    }
)

studentRouter.get(
    '/downloadCSV',
    (req, res) => {
        studentController.downloadCSVfile(req, res)
    }
)

export default studentRouter;