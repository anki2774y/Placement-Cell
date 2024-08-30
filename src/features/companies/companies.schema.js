// companyName, students(Array), createdAt, updatedAt
// student(Array) :
            // studentId 
            // date 
            // result 
import mongoose from "mongoose";

export const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    students: [
        {
            studentId : {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Students'
            },
            date : {
                type: Date,
                required: true
            },
            result: {
                type: String,
                required: true,
                enum: ['Placed', 'Not-Placed', 'On-Hold', 'Pending']
            }
        }
    ]
})