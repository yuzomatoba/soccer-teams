import ILeaderboard from '../interfaces/ILeaderboard';

const leaderboardModel = () => ({
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
});

const teamInformation = (home: ILeaderboard, away: ILeaderboard) => {
  const team = leaderboardModel();
  team.name = home.name;
  team.totalPoints = Number(home.totalPoints) + Number(away.totalPoints);
  team.totalGames = Number(home.totalGames) + Number(away.totalGames);
  team.totalVictories = Number(home.totalVictories) + Number(away.totalVictories);
  team.totalDraws = Number(home.totalDraws) + Number(away.totalDraws);
  team.totalLosses = Number(home.totalLosses) + Number(away.totalLosses);
  team.goalsFavor = Number(home.goalsFavor) + Number(away.goalsFavor);
  team.goalsOwn = Number(home.goalsOwn) + Number(away.goalsOwn);
  return team;
};

const teamOrder = (array: ILeaderboard[]) => {
  array.sort((a, b) => (b.totalPoints - a.totalPoints) || (b.totalVictories - a.totalVictories)
  || (b.goalsBalance - a.goalsBalance) || (b.goalsFavor - a.goalsFavor)
  || (b.goalsOwn - a.goalsOwn));
};

const generatingLeaderboard = (home: ILeaderboard[], away: ILeaderboard[]) => {
  const array: ILeaderboard[] = [];
  for (let index = 0; index < home.length; index += 1) {
    for (let index2 = 0; index2 < away.length; index2 += 1) {
      if (home[index].name === away[index2].name) {
        const team = teamInformation(home[index], away[index2]);
        team.goalsBalance = team.goalsFavor - team.goalsOwn;
        team.efficiency = (team.totalPoints / (team.totalGames * 3)) * 100;
        team.efficiency = +(team.efficiency.toFixed(2));
        array.push(team as unknown as ILeaderboard);
      }
    }
  }
  teamOrder(array);
  return array;
};

export default generatingLeaderboard;
