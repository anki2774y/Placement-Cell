import StudentRepository from "./student.repository.js";
import path from 'path';
import fs from 'fs';
import { createObjectCsvWriter } from "csv-writer";

export default class StudentController {
    constructor() {
        this.studentRepository = new StudentRepository();
    }

    getHome(req, res) {
        console.log("Home :: ", req.session);
        if (req.session.userEmail && req.session.userName) {
            res.render('home', { userEmail: req.session.userEmail, userName: req.session.userName });
        } else {
            res.redirect('/users/signIn');
        }
    }

    async getStudentList(req, res) {
        if (req.session.userEmail && req.session.userName) {
            try {
                const students = await this.studentRepository.getStudent();
                console.log("Students: ", students);
                res.render('studentList', { students });
            } catch (error) {
                console.error("getStudentList controller: ", error);
                res.status(500).send("An error occurred while fetching students.");
            }
        } else {
            res.redirect('/users/signIn');
        }
    }

    async postNewStudent(req, res) {
        
        const {
            name, email, collegeName, placementStatus, contactNumber, batch, dsaScore, webdScore, reactScore
        } = req.body;
        const newStudent = {
            name, email, collegeName, placementStatus, contactNumber, batch, dsaScore, webdScore, reactScore
        };
        if (req.session.userEmail && req.session.userName) {
            try {
                await this.studentRepository.addStudent(newStudent);
                res.redirect('/studentList'); // Redirect to fetch updated student list
            } catch (error) {
                console.log("postNewStudent controller: ", error);
                res.status(500).send("An error occurred while adding the student.");
            }
        } else {
            res.redirect('/users/signIn');
        }
    }

    async deleteStudent(req, res) {
        if (req.session.userEmail && req.session.userName) {
            try {
                await this.studentRepository.deleteStudent(req.params.id);
                res.redirect('/studentList');
            } catch (error) {
                console.log("deleteStudent controller: ", error);
                res.status(500).send("An error occurred while deleting the student.");
            }
        } else {
            res.redirect('/users/signIn');
        }
    }

    async downloadCSVfile(req, res) {
        let students;
        try {
            students = await this.studentRepository.getStudent();
        } catch (error) {
            console.log("downloadCSVfile : ", error);
        }

        // Define the path to save the CSV file
        const csvFolderPath = path.join(path.resolve(), 'public', 'csv-folder');
        const csvFilePath = path.join(csvFolderPath, 'data.csv');
        // Ensure the directory exists
        if (!fs.existsSync(csvFolderPath)) {
            fs.mkdirSync(csvFolderPath, { recursive: true });
        }

        const csvWriter = createObjectCsvWriter({
            path: csvFilePath,
            header: [
                { id: 'name', title: 'Name' },
                { id: 'email', title: 'Email' },
                { id: 'collegeName', title: 'College Name' },
                { id: 'placementStatus', title: 'Placement Status' },
                { id: 'contact', title: 'Contact Number' },
                { id: 'batch', title: 'Batch' },
                { id: 'dsaScore', title: 'DSA Score' },
                { id: 'webdScore', title: 'WebDScore' },
                { id: 'reactScore', title: 'ReactScore' },
                { id: 'interview', title: 'Interviewed At'},
            ]
        });

        const data = students.map((student, index) => ({
            name: student.name,
            email: student.email,
            collegeName: student.collegeName,
            placementStatus: student.placementStatus,
            contact: student.contactNumber,
            batch: student.batch,
            dsaScore: student.dsaScore,
            webdScore: student.webdScore,
            reactScore: student.reactScore,
            interview: student.interviews.map(interview => interview.companyName).join(', ')
        }));
        
    
        await csvWriter.writeRecords(data);
    
        res.download(csvFilePath, 'data.csv', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Could not download the file');
            } else {
                fs.unlinkSync(csvFilePath); // Delete the file after sending it
            }
        });

    }
}



// [
//     {
//       _id: new ObjectId('6683fc624edd91df787b66d7'),
//       name: 'Ankit Kumar',
//       email: 'ankitonly4u8010@gmail.com',
//       collegeName: 'MAIT',
//       placementStatus: 'On-Hold',
//       contactNumber: 8076479002,
//       batch: 'May 2022',
//       dsaScore: 50,
//       webdScore: 60,
//       reactScore: 10,
//       interviews: [ [Object], [Object] ],
//       createdAt: 2024-07-02T13:10:58.344Z,
//       updatedAt: 2024-07-02T13:10:58.344Z,
//       __v: 5
//     },
//     {
//       _id: new ObjectId('66855b0d81821e435add5176'),
//       name: 'Sachin Sharma',
//       email: 'sachin@gmail.com',
//       collegeName: 'Btech',
//       placementStatus: 'On-Hold',
//       contactNumber: 8888888888,
//       batch: 'August 2022',
//       dsaScore: 12,
//       webdScore: 12,
//       reactScore: 12,
//       interviews: [ [Object] ],
//       createdAt: 2024-07-03T14:07:09.749Z,
//       updatedAt: 2024-07-03T14:07:09.749Z,
//       __v: 2
//     }
//   ]