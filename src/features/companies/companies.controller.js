import StudentController from '../student/student.controller.js';
import CompanyRepository from './companies.repository.js';

const studentController = new StudentController();

export default class CompanyController {
    
    constructor() {
        this.companyRepository = new CompanyRepository();
    }

    async getCompanyList(req, res) {
        try {
            const companies = await this.companyRepository.getCompanyList();

            const formattedData = companies.flatMap((company, companyIndex) => 
                company.students.map((student, studentIndex) => ({
                    serialNumber: studentIndex + 1,
                    companyId: company._id,
                    companyName: company.name,
                    studentId: student.studentId._id,
                    studentName: student.studentId.name,
                    studentEmail: student.studentId.email,
                    studentContact: student.studentId.contactNumber,
                    studentBatch: student.studentId.batch,
                    interviewDate: new Date(student.date).toLocaleDateString(),
                    result: student.studentId.interviews.map((interview) => {
                        if(company._id == interview.companyId) {
                            return interview.result
                        }
                    })
                }))
            );

            console.log("companies ::::::: ", formattedData);

            res.render('companyList', { formattedData });
        } catch (error) {
            console.error("getCompanyList controller: ", error);
            res.status(500).send("An error occurred while fetching students.");
        }
    }

    async updateInterviewResult(req, res) {
        console.log("updateinterview result : ", req.body);
        const { studentId, companyId, result } = req.body
        try {
            const student = await this.companyRepository.updateInterviewResult(studentId, companyId, result);
            // console.log("updateinterviewresult : ", student)
            res.redirect('/companies');
        } catch (error) {
            console.error("updateInterviewResult controller: ", error);
            res.status(500).send("An error occurred while updating interview result.");
        }
    }

    async allocateInterview(req, res) {
        // console.log("Allocate Interview details : ", req.body);
        const {
            studentId, 
            name,
            date
        } = req.body;
        const interviewDetails = {
            name: name,
            students: {
                studentId: studentId,
                date: date,
                result: 'Pending'
            }
        }
        try {
            const result =  await this.companyRepository.allocateInterview(interviewDetails);
            console.log(result);
            res.redirect('/companies');
        } catch (error) {
            console.log("aloocate interview a: ", error);
        }
    }

}