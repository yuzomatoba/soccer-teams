import { RequestHandler } from 'express';
import ITeamService from '../interfaces/ITeamService';
import httpCode from '../utils/httpCode';

export default class TeamController {
  constructor(private _teamService: ITeamService) {}

  findAll: RequestHandler = async (_req, res) => {
    const teams = await this._teamService.findAll();
    return res.status(httpCode.OK).json(teams);
  };

  findByPk: RequestHandler = async (req, res) => {
    const team = await this._teamService.findByPk(Number(req.params.id));
    return res.status(httpCode.OK).json(team);
  };
}
