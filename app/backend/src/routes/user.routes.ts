import * as express from 'express';
import loginValidation from '../middlewares/login.middleware';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';
import authorizationMiddleware from '../middlewares/authorization.middleware';

const userRoute = express.Router();

const userController = new UserController(new UserService());

userRoute.get('/validate', authorizationMiddleware, userController.findingRole);
userRoute.post('/', loginValidation, userController.login);

export default userRoute;
