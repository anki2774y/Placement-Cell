import UserModel from "./user.model.js";
import UserRepository from "./user.repository.js";

export default class UserController {

    constructor() {
        this.userRepository = new UserRepository();
    }

    getSignIn(req, res) {
        if(req.session.userEmail && req.session.userName) {
            res.render('home', { errorMessage: null });
        } else {
            res.render('signIn', { errorMessage: null });
        }
    }

    getRegister(req, res) {
        if(req.session.userEmail && req.session.userName) {
            res.render('home', { errorMessage: null });
        } else {
            res.render('register', { errorMessage: null });
        }
    }

    // for registration new user
    async postRegister(req, res) {
        console.log("REq Body : ", req.body);
        const { name, email, password } = req.body;
        try {
            const user = new UserModel(name, email, password);
            await this.userRepository.register(user);
            res.redirect('/users/signIn');
        } catch (error) {
            console.log(error);
            return res.status(404).send('Something went wrong');
        }
    }

    async postSignIn(req, res) {
        try {
            const userPresent = await this.userRepository.findByMail(req.body.email);
            if(!userPresent) {
                return res.status(400).send('Invalid Credentials');
            } else {
                // find email with password 
                const userSignIn = await this.userRepository.signIn(req.body.email, req.body.password);
                console.log("User found : ", userSignIn);
                if(userSignIn) {
                    req.session.userEmail = userSignIn.email; 
                    req.session.userName = userSignIn.name;
                    res.redirect('/home');
                } else {
                    res.status('401').send('Invalid Credentials');
                }
            }   
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(500).send('Internal Server Error');
        }
    }

    async signOut(req, res) {
        req.session.destroy((err) => {
            if(err) {
                console.log(err);
            } else {
                res.redirect('/users/signIn');
            }
        });
        res.clearCookie('lastVisit');
    }

}