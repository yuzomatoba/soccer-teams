import { Request, Response } from 'express';
import { MatchGoals } from '../interfaces/IMatchService';
import IMatch from '../interfaces/IMatch';
import { IMatchController } from '../interfaces/IMatchController';
import MatchService from '../services/match.service';
import httpCode from '../utils/httpCode';

export default class MatchController implements IMatchController {
  constructor(private _matchService = new MatchService()) {}

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

    const newMatchStarts = await this._matchService.newMatch(match);
    return res.status(httpCode.created).json(newMatchStarts);
  };
}
