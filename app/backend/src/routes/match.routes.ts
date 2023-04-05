import * as express from 'express';
import MatchController from '../controllers/match.controller';
import authorizationMiddleware from '../middlewares/authorization.middleware';

const matchRoute = express.Router();

const matchController = new MatchController();

matchRoute.post('/', authorizationMiddleware, matchController.newMatch);
matchRoute.get('/', matchController.findAll);
matchRoute.patch('/:id/finish', authorizationMiddleware, matchController.endMatch);
matchRoute.patch('/:id', authorizationMiddleware, matchController.matchInProgress);

export default matchRoute;
