// Manage routes/paths to StudentController 

// 1. Import express.
import express from 'express';
import CompanyController from './companies.controller.js';

// 2. Initialize Express router 
const companyRouter = express.Router();

const companyController = new CompanyController();

// All the paths to controller methods.


companyRouter.get(
    '/companies',
    (req, res) => {
        companyController.getCompanyList(req, res)
    }
)

companyRouter.post(
    '/allocateInterview',
    (req, res) => {
        companyController.allocateInterview(req, res)
    }
)

companyRouter.post(
    '/updateInterviewResult',
    (req, res) => {
        companyController.updateInterviewResult(req, res)
    }
)

export default companyRouter;