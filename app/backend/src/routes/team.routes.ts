import * as express from 'express';
import TeamService from '../services/team.service';
import TeamController from '../controllers/team.controller';

const teamRoute = express.Router();

const teamController = new TeamController(new TeamService());

teamRoute.get('/', teamController.findAll);

export default teamRoute;
