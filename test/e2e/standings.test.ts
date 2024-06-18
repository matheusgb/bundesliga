import supertest from "supertest";

describe("Bundesliga 2023/24 standings e2e tests", () => {
  it("should return Bundesliga 2023/24 season standings", async () => {
    const { body, status } = await supertest(app).get("/standings");
    expect(status).toBe(200);
    expect(body).toBeTruthy();
  });
});
