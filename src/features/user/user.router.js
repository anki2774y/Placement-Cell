// Manage routes/paths to StudentController 

// 1. Import express.
import express from 'express';
import UserController from './user.controller.js';

// 2. Initialize Express router 
const userRouter = express.Router();

const userController = new UserController();

// All the paths to controller methods.
userRouter.get(
    '/signIn',
    (req, res) => {
        userController.getSignIn(req, res);
    }
)

userRouter.get(
    '/register',
    (req, res) => {
        userController.getRegister(req, res);
    }
)

userRouter.post(
    '/register',
    (req, res) => {
        userController.postRegister(req, res);
    }
)

userRouter.post(
    '/signIn',
    (req, res) => {
        userController.postSignIn(req, res);
    }
)

userRouter.get(
    '/signOut',
    (req, res) => {
        userController.signOut(req, res);
    }
)

export default userRouter;