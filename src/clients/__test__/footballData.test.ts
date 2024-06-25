import { FootballData } from '@src/clients/footballData';
import axios from 'axios';
import footballDataStandingsFixture from '@test/fixtures/footballDataStandings.json';
import footballDataNormalizedStandingsFixture from '@test/fixtures/footballDataNormalizedStandings.json';

jest.mock('axios');

describe('FootballData client', () => {
  it('should return normalized standings of 2023/24 season from football-data service', async () => {
    axios.get = jest.fn().mockResolvedValue(footballDataStandingsFixture);

    const footballData = new FootballData(axios);
    const response = await footballData.fetchStandings();
    expect(response).toEqual(footballDataNormalizedStandingsFixture);
  });
});
