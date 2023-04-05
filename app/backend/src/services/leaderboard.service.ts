import { ModelStatic } from 'sequelize';
import IMatch from '../interfaces/IMatch';
import Match from '../database/models/match.model';
import Team from '../database/models/team.model';
import ITeam from '../interfaces/ITeam';
import ILeaderboard from '../interfaces/ILeaderboard';
import { ILeaderboardService, TeamType } from '../interfaces/ILeaderboardService';

export default class LeaderboardService implements ILeaderboardService {
  constructor(
    private teamModel: ModelStatic<Team> = Team,
    private matchModel: ModelStatic<Match> = Match,
  ) {}

  static gettingMatch(
    team: ITeam,
    type: TeamType,
    matches: IMatch[],
  ): IMatch[] {
    return matches.filter((match: IMatch) => {
      const { homeTeamId, awayTeamId } = match;
      const id = match[`${type}TeamId` as keyof IMatch];
      return (
        type === 'both' && (homeTeamId === team.id || awayTeamId === team.id)
      ) || (id === team.id);
    });
  }

  static gettingVictoriesAndLosses(
    matches: IMatch[],
    teamId: number,
    type: 'losses' | 'victories',
  ): number {
    return matches.reduce((a, match: IMatch) => {
      const { homeTeamGoals, awayTeamGoals, homeTeamId } = match;
      const homeTeamGoal = homeTeamId === teamId ? homeTeamGoals : awayTeamGoals;
      const awayTeamGoal = homeTeamId !== teamId ? homeTeamGoals : awayTeamGoals;

      return type === 'victories'
        ? a + (homeTeamGoal > awayTeamGoal ? 1 : 0)
        : a + (homeTeamGoal < awayTeamGoal ? 1 : 0);
    }, 0);
  }

  static gettingDraws(matches: IMatch[]): number {
    return matches.filter(
      (match: IMatch) => match.homeTeamGoals === match.awayTeamGoals,
    ).length;
  }

  static gettingTotalPoints(matches: IMatch[], teamId: number): number {
    const { gettingVictoriesAndLosses, gettingDraws } = LeaderboardService;
    const victory = gettingVictoriesAndLosses(matches, teamId, 'victories');
    const draw = gettingDraws(matches);
    return victory * 3 + draw;
  }

  static gettingGoals(
    matches: IMatch[],
    teamId: number,
    type: 'own' | 'favor',
  ): number {
    return matches.reduce((a, match: IMatch) => {
      const { homeTeamId, homeTeamGoals, awayTeamGoals } = match;

      return type === 'favor'
        ? a + (homeTeamId === teamId ? homeTeamGoals : awayTeamGoals)
        : a + (homeTeamId === teamId ? awayTeamGoals : homeTeamGoals);
    }, 0);
  }

  static gettingBalance(matches: IMatch[], teamId: number): number {
    const { gettingGoals } = LeaderboardService;

    const favoringGoals = gettingGoals(matches, teamId, 'favor');
    const OwningGoals = gettingGoals(matches, teamId, 'own');

    return favoringGoals - OwningGoals;
  }

  static gettingEfficiency(matches: IMatch[], teamId: number): string {
    const { gettingTotalPoints } = LeaderboardService;
    const totalPoints = gettingTotalPoints(matches, teamId);
    const totalGames = matches.length;
    const efficiency = (totalPoints / (totalGames * 3)) * 100;

    return efficiency.toFixed(2);
  }

  static settingTeam(matches: IMatch[], team: ITeam) {
    const {
      gettingTotalPoints, gettingVictoriesAndLosses,
      gettingDraws, gettingGoals,
      gettingBalance,
      gettingEfficiency,
    } = LeaderboardService;

    return {
      name: team.teamName,
      totalPoints: gettingTotalPoints(matches, team.id),
      totalGames: matches.length,
      totalVictories: gettingVictoriesAndLosses(matches, team.id, 'victories'),
      totalDraws: gettingDraws(matches),
      totalLosses: gettingVictoriesAndLosses(matches, team.id, 'losses'),
      goalsFavor: gettingGoals(matches, team.id, 'favor'),
      goalsOwn: gettingGoals(matches, team.id, 'own'),
      goalsBalance: gettingBalance(matches, team.id),
      efficiency: gettingEfficiency(matches, team.id),
    };
  }

  static sortingLeaderboard(
    leaderboard: ILeaderboard[],
  ): ILeaderboard[] {
    return leaderboard.sort((a: ILeaderboard, b: ILeaderboard) =>
      b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
  }

  homeLeaderboard = async (typeOfTeam: TeamType): Promise<ILeaderboard[]> => {
    const {
      gettingMatch,
      settingTeam,
      sortingLeaderboard,
    } = LeaderboardService;

    const teamList: ITeam[] = await this.teamModel.findAll();
    const matchList: IMatch[] = await this.matchModel.findAll({
      where: { inProgress: false },
    });

    const leaderboard: ILeaderboard[] = teamList.map((team: ITeam) => {
      const match: IMatch[] = gettingMatch(team, typeOfTeam, matchList);
      return settingTeam(match, team);
    });

    return sortingLeaderboard(leaderboard);
  };
}
