import standingsServiceExpectedResponseFixture from '@test/fixtures/standingsServiceExpectedResponseFixture.json';
import footballDataNormalizedStandingsFixture from '@test/fixtures/footballDataNormalizedStandings.json';
import { FootballData } from '@src/clients/footballData';
import { AddPerformanceField } from '@src/services/standings';

jest.mock('@src/clients/footballData');

describe('Standings Service', () => {
  const mockedFootballDataService =
    new FootballData() as jest.Mocked<FootballData>;
  it('should return the standings with performance field', async () => {
    mockedFootballDataService.fetchStandings.mockResolvedValue(
      footballDataNormalizedStandingsFixture
    );
    const performance = new AddPerformanceField(mockedFootballDataService);
    const teamsWithPerformanceField =
      await performance.calculatePerformanceField();

    expect(teamsWithPerformanceField).toEqual(
      standingsServiceExpectedResponseFixture
    );
  });

  it('should return a empty list when the standings array is empty', async () => {
    mockedFootballDataService.fetchStandings.mockResolvedValue([]);
    const performance = new AddPerformanceField(mockedFootballDataService);

    const response = await performance.calculatePerformanceField();
    expect(response).toEqual([]);
  });

  it('should throw internal processing error when something goes wrong in performance calculation', async () => {
    mockedFootballDataService.fetchStandings.mockRejectedValue(
      'Error fetching data'
    );
    const performance = new AddPerformanceField(mockedFootballDataService);
    expect(performance.calculatePerformanceField()).rejects.toThrow();
  });
});
