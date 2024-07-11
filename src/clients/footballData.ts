import { AxiosStatic } from 'axios';

export interface Filters {
  season: string;
}

export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
}

export interface Winner {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  lastUpdated: string;
}

export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner: Winner;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface Table {
  position: number;
  team: Team;
  playedGames: number;
  form: string;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}

export interface Standing {
  stage: string;
  type: string;
  group: null;
  table: Table[];
}

export interface BundesligaData {
  readonly filters: Filters;
  readonly area: Area;
  readonly competition: Competition;
  readonly season: Season;
  readonly standings: Standing[];
}

interface NormalizedTeam {
  name: string;
  crest: string;
}

interface BundesligaNormalizedData {
  position: number;
  team: NormalizedTeam;
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
}
export class FootballData {
  readonly footballDataSeason = '2023';

  constructor(protected request: AxiosStatic) {}

  public async fetchStandings(): Promise<BundesligaNormalizedData[]> {
    const response = await this.request.get<BundesligaData>(
      `https://api.football-data.org/v4/competitions/BL1/standings/?season=${this.footballDataSeason}`
    );
    return this.normalizeResponse(response.data);
  }

  private normalizeResponse(
    bundesliga: BundesligaData
  ): BundesligaNormalizedData[] {
    const leverkusen = bundesliga.standings[0].table[0];
    const darmstadt = bundesliga.standings[0].table[17];

    const normalizedLeverkusen: BundesligaNormalizedData = {
      position: leverkusen.position,
      team: {
        name: leverkusen.team.name,
        crest: leverkusen.team.crest,
      },
      playedGames: leverkusen.playedGames,
      won: leverkusen.won,
      draw: leverkusen.draw,
      lost: leverkusen.lost,
      points: leverkusen.points,
    };

    const normalizedDarmstadt: BundesligaNormalizedData = {
      position: darmstadt.position,
      team: {
        name: darmstadt.team.name,
        crest: darmstadt.team.crest,
      },
      playedGames: darmstadt.playedGames,
      won: darmstadt.won,
      draw: darmstadt.draw,
      lost: darmstadt.lost,
      points: darmstadt.points,
    };

    return [normalizedLeverkusen, normalizedDarmstadt];
  }
}
