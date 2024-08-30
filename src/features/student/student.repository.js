import mongoose from "mongoose";
import { studentSchema } from "./student.schema.js";

const StudentModel = mongoose.model('Students', studentSchema);

export default class StudentRepository {
    constructor() {
        this.collection = 'students';
    }

    async getStudent() {
        try {
            const students = await StudentModel.find();
            return students;
        } catch (error) {
            console.log("getStudent repository : ", error);
        }
    }

    async addStudent(student) {
        try {
            const newStudent = new StudentModel(student);
            await newStudent.save();
            return newStudent;
        } catch (error) {
            console.log("addStudent repository : ", error);
        }
    }

    async deleteStudent(id) {
        try {
            return await StudentModel.findByIdAndDelete(id);
        } catch (error) {
            console.log("deleteStudent repository : ", error);
        }
    }
}