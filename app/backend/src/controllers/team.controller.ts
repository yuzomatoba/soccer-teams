import { RequestHandler } from 'express';
import ITeamService from '../interfaces/ITeamService';

export default class TeamController {
  constructor(private _teamService: ITeamService) {}

  findAll: RequestHandler = async (req, res) => {
    const teams = await this._teamService.findAll();
    return res.status(200).json(teams);
  };
}
