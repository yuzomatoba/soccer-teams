import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import { TeamType } from '../interfaces/ILeaderboardService';
import { ILeaderboardController } from '../interfaces/ILeaderboardController';
import httpCode from '../utils/httpCode';

export default class LeaderboardController implements ILeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  homeLeaderboard = async (req: Request, res: Response): Promise<Response | void> => {
    const newTeamRoute = req.url.replace(/\//g, '').replace('leaderboard', '');

    const teamType = newTeamRoute || 'both';

    const newLeaderboard = await this.leaderboardService.homeLeaderboard(teamType as TeamType);
    return res.status(httpCode.OK).json(newLeaderboard);
  };
}
