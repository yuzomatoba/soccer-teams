import ILeaderboard from './ILeaderboard';

export type TeamType = 'away' | 'home' | 'both';

export interface ILeaderboardService {
  homeLeaderboard(team: TeamType): Promise<ILeaderboard[]>;
}
