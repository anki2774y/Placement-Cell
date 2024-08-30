import mongoose from "mongoose";
import { companySchema } from "./companies.schema.js";
import { studentSchema } from "../student/student.schema.js";

const CompanyModel = mongoose.model('Companies', companySchema);
const StudentModel = mongoose.model('Students', studentSchema);

export default class CompanyRepository {

    constructor() {
        this.collection = 'companies';
    }

    async allocateInterview(interviewDetails) {
        try {
            const newInterview = new CompanyModel(interviewDetails);

            // finding company is present or not
                // if present match student is present or not
            const isCompanyIsStudent = await CompanyModel.findOne( { 
                name: newInterview.name,
                students: { $elemMatch: { studentId: interviewDetails.students.studentId } }
            });

            // if company and student are present
            if(isCompanyIsStudent) {
                return "In same company, for same student interview is allready scheduled!!!"
            }
            
            // if student is not present in above method
            const isCompany = await CompanyModel.findOne( { 
                name: newInterview.name
            });

            const student = await StudentModel.findOne({_id: interviewDetails.students.studentId});
            let result;
            
            // find company if present 
                // add student in students array else 
                    // create new allocation of interview
            if(isCompany) {
                const student = interviewDetails.students;
                await isCompany.students.push( student );

                result = await isCompany.save();
            } else {
                result =  await newInterview.save();
            }

            // console.log(result, " : result ::::::::");
            await student.interviews.push({
                companyId: result._id,
                companyName: result.name,
                interviewDate: result.students[0].date,
                result: result.students[0].result
            });
            await student.save();
            
            return result;      
        } catch (error) {
            console.log("allocateInterview repository : ", error);
        }
    }

    async getCompanyList() {
        try {
            const companies = await CompanyModel.find().populate('students.studentId');;
            return companies;
        } catch (error) {
            console.log("getStudent repository : ", error);
        }
    }

    async updateInterviewResult(studentId, companyId, result) {
        try {
            const student = await StudentModel.findById({_id: studentId});
            const company = student.interviews.find(interview => interview.companyId == companyId);
            company.result = result;
            if(result == 'Placed') {
                student.placementStatus = result;
            }
            // console.log("id --------------------: ", company);
            await student.save();
            // student.placementStatus = result;
            // student.placementStatus.interviews.map((interview) => ({
            //     interview.companyId
            // }))
        } catch (error) {
            console.log("update interview result repository : ", error);
        }
    }

}

// intervies (Array )
    // : company 
    // : date 
    // : result 
    // : companyid  