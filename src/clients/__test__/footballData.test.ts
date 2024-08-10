import { FootballData } from '@src/clients/footballData';
import * as HTTPUtil from '@src/util/request';
import footballDataStandingsFixture from '@test/fixtures/footballDataStandings.json';
import incompleteFootballDataStandingsFixture from '@test/fixtures/incompleteFootballDataStandings.json';
import footballDataNormalizedStandingsFixture from '@test/fixtures/footballDataNormalizedStandings.json';

jest.mock('@src/util/request');

describe('FootballData client', () => {
  const mockedRequest = new HTTPUtil.Request() as jest.Mocked<HTTPUtil.Request>;
  const mockedRequestClass = HTTPUtil.Request as jest.Mocked<
    typeof HTTPUtil.Request
  >;

  it('should return normalized standings of 2023/24 season from football-data service', async () => {
    mockedRequest.get.mockResolvedValue({
      data: footballDataStandingsFixture,
    } as HTTPUtil.Response);

    const footballData = new FootballData(mockedRequest);
    const response = await footballData.fetchStandings();
    expect(response).toEqual(footballDataNormalizedStandingsFixture);
  });

  it('should return an empty array if any crucial information is missing from the football-data service', async () => {
    mockedRequest.get.mockResolvedValue({
      data: incompleteFootballDataStandingsFixture,
    } as HTTPUtil.Response);

    const footballData = new FootballData(mockedRequest);
    const response = await footballData.fetchStandings();
    expect(response).toEqual([]);
  });

  it('should return a gerenic error when the request fail before reaching the football-data service', async () => {
    mockedRequest.get.mockRejectedValue({
      message: 'Network Error',
    });

    const footballData = new FootballData(mockedRequest);

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

    mockedRequestClass.isRequestError.mockReturnValue(true);
    mockedRequest.get.mockRejectedValue(
      new FakeAxiosError({
        status: 429,
      })
    );

    const footballData = new FootballData(mockedRequest);

    expect(footballData.fetchStandings()).rejects.toThrow(
      'Unexpected error returned by football-data service: 429'
    );
  });
});
