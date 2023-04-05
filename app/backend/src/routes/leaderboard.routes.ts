import * as express from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const leaderboardRoute = express.Router();

const leaderboardController = new LeaderboardController();

leaderboardRoute.get('/home', leaderboardController.homeLeaderboard);
leaderboardRoute.get('/away', leaderboardController.homeLeaderboard);
leaderboardRoute.get('/', leaderboardController.homeLeaderboard);

export default leaderboardRoute;
