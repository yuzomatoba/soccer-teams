import IMatch from './IMatch';

export type MatchGoals = { homeTeamGoals: number, awayTeamGoals: number };

export interface IMatchService {
  findAll(matchProgress: string): Promise<IMatch[]>;
  endMatch(matchId: number): Promise<string>;
  matchInProgress(matchId: number, goals: MatchGoals): Promise<string>;
}
