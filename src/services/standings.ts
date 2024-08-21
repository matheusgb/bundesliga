import {
  FootballData,
  BundesligaNormalizedData,
} from '@src/clients/footballData';

interface footballDataWithPerformance extends BundesligaNormalizedData {
  performance: number;
}

export class AddPerformanceField {
  constructor(protected footballData = new FootballData()) {}

  public async calculatePerformanceField(): Promise<
    footballDataWithPerformance[]
  > {
    try {
      const teams = await this.footballData.fetchStandings();
      const teamsWithPerformanceField = teams.map((team) => {
        const performance = (team.points / (team.playedGames * 3)) * 100;
        return {
          ...team,
          performance: parseFloat(performance.toFixed(2)),
        };
      });
      return teamsWithPerformanceField;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
