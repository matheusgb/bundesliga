import { InternalError } from '@src/util/errors/internalError';
import config, { IConfig } from 'config';
import * as HTTPUtil from '@src/util/request';
import { AxiosError } from 'axios';

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

export class ClientRequestError extends InternalError {
  constructor(message: string) {
    const internalMessage =
      'Unexpected error when trying to comunicate to football-data service';
    super(`${internalMessage}: ${message}`);
  }
}

export class FootballDataResponseError extends InternalError {
  constructor(status: string) {
    const internalMessage =
      'Unexpected error returned by football-data service';
    super(`${internalMessage}: ${status}`);
  }
}

const footballDataResourceConfig: IConfig = config.get(
  'App.resources.FootballData'
);

export class FootballData {
  private readonly footballDataSeason = '2023';

  constructor(protected request = new HTTPUtil.Request()) {}

  public async fetchStandings(): Promise<BundesligaNormalizedData[]> {
    try {
      const response = await this.request.get<BundesligaData>(
        `${footballDataResourceConfig.get(
          'apiUrl'
        )}/competitions/BL1/standings/?season=${this.footballDataSeason}`,
        {
          headers: {
            'X-Auth-Token': footballDataResourceConfig.get('apiToken'),
          },
        }
      );
      return this.normalizeResponse(response.data);
    } catch (err) {
      const axiosError = err as AxiosError;
      if (HTTPUtil.Request.isRequestError(axiosError)) {
        throw new FootballDataResponseError(`${axiosError.response?.status}`);
      }
      throw new ClientRequestError(axiosError.message);
    }
  }

  private normalizeResponse(
    bundesliga: BundesligaData
  ): BundesligaNormalizedData[] {
    const standing = bundesliga?.standings.find(
      (standing) =>
        standing.stage === 'REGULAR_SEASON' && standing.type === 'TOTAL'
    );

    const teams =
      standing?.table?.filter(
        (position) =>
          position.team.shortName === 'Leverkusen' ||
          position.team.shortName === 'Darmstadt'
      ) ?? [];

    const normalizedTeams: BundesligaNormalizedData[] =
      teams.map((club) => ({
        position: club.position,
        team: {
          name: club.team.name,
          crest: club.team.crest,
        },
        playedGames: club.playedGames,
        won: club.won,
        draw: club.draw,
        lost: club.lost,
        points: club.points,
      })) || [];

    return normalizedTeams;
  }
}
