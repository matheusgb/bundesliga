import { FootballData } from '@src/clients/footballData';
import axios from 'axios';
import footballDataStandingsFixture from '@test/fixtures/footballDataStandings.json';
import incompleteFootballDataStandingsFixture from '@test/fixtures/incompleteFootballDataStandings.json';
import footballDataNormalizedStandingsFixture from '@test/fixtures/footballDataNormalizedStandings.json';

jest.mock('axios');

describe('FootballData client', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  it('should return normalized standings of 2023/24 season from football-data service', async () => {
    mockedAxios.get.mockResolvedValue({ data: footballDataStandingsFixture });

    const footballData = new FootballData(mockedAxios);
    const response = await footballData.fetchStandings();
    expect(response).toEqual(footballDataNormalizedStandingsFixture);
  });

  it('should return an empty array if any crucial information is missing from the football-data service', async () => {
    mockedAxios.get.mockResolvedValue({
      data: incompleteFootballDataStandingsFixture,
    });

    const footballData = new FootballData(mockedAxios);
    const response = await footballData.fetchStandings();
    expect(response).toEqual([]);
  });

  it('should return a gerenic error when the request fail before reaching the football-data service', async () => {
    mockedAxios.get.mockRejectedValue({
      message: 'Network Error',
    });

    const footballData = new FootballData(mockedAxios);

    expect(footballData.fetchStandings()).rejects.toThrow(
      'Unexpected error when trying to comunicate to football-data service: Network Error'
    );
  });

  it('should return a error when the football-data service responds with error', async () => {
    class FakeAxiosError extends Error {
      constructor(public response: object) {
        super();
      }
    }

    mockedAxios.get.mockRejectedValue(
      new FakeAxiosError({
        status: 429,
      })
    );

    const footballData = new FootballData(mockedAxios);

    expect(footballData.fetchStandings()).rejects.toThrow(
      'Unexpected error returned by football-data service: 429'
    );
  });
});
