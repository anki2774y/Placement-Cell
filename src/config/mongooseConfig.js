import mongoose from "mongoose";


const url = 'mongodb://localhost:27017/placement-cell'

export const connectUsingMongoose = async() => {
    try {
        await mongoose
            .connect(url)
            .then(() => {
                console.log('MongoDB connected using Mongoose');
            })
            .catch(err => console.log(err));
    } catch (error) {
        console.log("Error while connecting to DB");
        console.log(error);
    }
}