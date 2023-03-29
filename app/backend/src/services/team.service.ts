import ITeamService from '../interfaces/ITeamService';
import Team from '../database/models/team.model';
import ITeam from '../interfaces/ITeam';

export default class TeamService implements ITeamService {
  constructor(private _teamModel = Team) {}

  findAll = async (): Promise<ITeam[] | void> => {
    const teams = await this._teamModel.findAll();
    if (teams) return teams;
  };
}
