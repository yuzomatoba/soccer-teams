import * as express from 'express';
import loginValidation from '../middlewares/login.middleware';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';

const userRoute = express.Router();

const userController = new UserController(new UserService());

userRoute.post('/', loginValidation, userController.login);

export default userRoute;
