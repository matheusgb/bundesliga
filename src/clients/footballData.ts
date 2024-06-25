import { AxiosStatic } from 'axios';

export class FootballData {
  readonly footballDataSeason = '2023';

  constructor(protected request: AxiosStatic) {}

  public async fetchStandings(): Promise<{}> {
    return this.request.get(
      `https://api.football-data.org/v4/competitions/BL1/standings/?season=${this.footballDataSeason}`
    );
  }
}
