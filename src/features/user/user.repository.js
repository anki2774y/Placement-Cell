import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";

const UserModel = mongoose.model('Users', userSchema);

export default class UserRepository {

    // registeration
    async register(user) {
        try {
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        } catch (error) {
            console.log("ERROR while REGISTER: ", error);
        }
    }

    // to sign in = first -  find email 
    async findByMail(email) {
        try {
            return UserModel.findOne({email});
        } catch (error) {
            console.log("ERROR while FIND_BY_EMAIL: ", error);
        }
    }

    // to sign in = second - find email with password 
    async signIn(email, password) {
        console.log("email ;", email, " ", password);
        try {
            return UserModel.findOne({email, password});
        } catch (error) {
            console.log("ERROR while SIGNING_IN: ", error);
        }
    }

}