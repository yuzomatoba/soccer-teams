import { Request, Response } from 'express';
import { MatchGoals } from '../interfaces/IMatchService';
import IMatch from '../interfaces/IMatch';
import { IMatchController } from '../interfaces/IMatchController';
import MatchService from '../services/match.service';
import httpCode from '../utils/httpCode';
import TeamService from '../services/team.service';

export default class MatchController implements IMatchController {
  constructor(
    private _matchService = new MatchService(),
    private _teamService = new TeamService(),
  ) {}

  findAll = async (req: Request, res: Response): Promise<Response | void> => {
    const { inProgress } = req.query;

    const matches = await this._matchService.findAll(inProgress as string);
    return res.status(httpCode.OK).json(matches);
  };

  endMatch = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const endedMatch = await this._matchService.endMatch(+id);
    return res.status(httpCode.OK).json({ message: endedMatch });
  };

  matchInProgress = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const matchGoals = req.body as MatchGoals;

    const endedMatch = await this._matchService.matchInProgress(+id, matchGoals);
    return res.status(httpCode.OK).json({ message: endedMatch });
  };

  newMatch = async (req: Request, res: Response): Promise<Response | void> => {
    const match = req.body as IMatch;
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(httpCode.unprocessableContent)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const homeTeam = await this._teamService.findByPk(homeTeamId);
    const awayTeam = await this._teamService.findByPk(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return res.status(httpCode.notFound).json({ message: 'There is no team with such id!' });
    }
    const newMatchStarts = await this._matchService.newMatch(match);
    return res.status(httpCode.created).json(newMatchStarts);
  };
}
