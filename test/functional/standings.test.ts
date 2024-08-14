import standingsServiceExpectedResponseFixture from '@test/fixtures/standingsServiceExpectedResponseFixture.json';

describe('Bundesliga 2023/24 standings functional tests', () => {
  it('should return Bundesliga 2023/24 season standings', async () => {
    const { body, status } = await global.testRequest.get('/standings');
    expect(status).toBe(200);
    expect(body).toEqual(standingsServiceExpectedResponseFixture);
  });
});
