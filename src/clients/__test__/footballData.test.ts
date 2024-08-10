import { FootballData } from '@src/clients/footballData';
import axios from 'axios';
import footballDataStandingsFixture from '@test/fixtures/footballDataStandings.json';
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
});
