import { ModelStatic } from 'sequelize';
import Team from '../database/models/team.model';
import Match from '../database/models/match.model';
import IMatch from '../interfaces/IMatch';
import { IMatchService, MatchGoals } from '../interfaces/IMatchService';

export default class MatchService implements IMatchService {
  constructor(private _matchmodel: ModelStatic<Match> = Match) {}

  findAll = async (matchInProgress: string): Promise<IMatch[]> => {
    const conditionInProgess = matchInProgress ? { inProgress: JSON.parse(matchInProgress) } : {};

    const matches = await this._matchmodel.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: conditionInProgess,
    });

    return matches;
  };

  endMatch = async (matchId: number): Promise<string> => {
    await this._matchmodel.update({ inProgress: false }, { where: { id: matchId } });
    return 'Ended';
  };

  matchInProgress = async (matchId: number, goals: MatchGoals): Promise<string> => {
    await this._matchmodel.update(
      {
        homeTeamGoals: goals.homeTeamGoals,
        awayTeamGoals: goals.awayTeamGoals,
      },
      { where: { id: matchId } },
    );
    return 'Ended Match';
  };

  newMatch = async (match: IMatch): Promise<IMatch> => {
    const newMatchStarts: IMatch = await this._matchmodel.create({
      ...match, inProgress: true,
    });
    return newMatchStarts;
  };
}
