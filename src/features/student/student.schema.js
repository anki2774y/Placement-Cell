// name, email, college, placement-status, contactnumber, batch, DSA, WEBD, REACT, interviews(Array), createdAt, updatedAt

import mongoose from "mongoose";

export const studentSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/.+\@.+\../, "Please enter a valid email"]
    },
    collegeName: {
        type: String,
        required: true
    },
    placementStatus: {
        type: String,
        enum: ['Placed', 'Not-Placed', 'On-Hold', 'Pending'],
        required: true
    },
    contactNumber: {
        type: Number,
        unique: true,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    dsaScore: {
        type: Number,
        required: true
    },
    webdScore: {
        type: Number,
        required: true
    },
    reactScore: {
        type: Number,
        required: true
    },
    interviews: [
        {
            companyId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Companies'
            },
            companyName: {
                type: String,
                required: true
            },
            interviewDate: {
                type: Date,
                required: true
            },
            result: {
                type: String,
                required: true,
                enum: ['Placed', 'Not-Placed', 'On-Hold', 'Pending']
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})


// intervies (Array )
    // : company 
    // : date 
    // : result 
    // : companyid  