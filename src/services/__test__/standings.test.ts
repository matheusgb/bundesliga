import standingsServiceExpectedResponseFixture from '@test/fixtures/standingsServiceExpectedResponseFixture.json';
import footballDataNormalizedStandingsFixture from '@test/fixtures/footballDataNormalizedStandings.json';
import { FootballData } from '@src/clients/footballData';
import { AddPerformanceField } from '@src/services/standings';

jest.mock('@src/clients/footballData');

describe('Standings Service', () => {
  it('should return the standings with performance field', async () => {
    FootballData.prototype.fetchStandings = jest
      .fn()
      .mockResolvedValue(footballDataNormalizedStandingsFixture);

    const performance = new AddPerformanceField(new FootballData());
    const teamsWithPerformanceField =
      await performance.calculatePerformanceField();

    expect(teamsWithPerformanceField).toEqual(
      standingsServiceExpectedResponseFixture
    );
  });
});
