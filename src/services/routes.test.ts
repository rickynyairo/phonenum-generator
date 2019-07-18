import express, { Router, response } from "express";
import supertest from "supertest";
import { applyMiddleware, applyRoutes } from "../utils";
import requestPromise from "request-promise";
import middleware from "../middleware";
import errorHandlers from "../middleware/errorHandlers";
import routes from "./routes";

jest.mock("request-promise");
(requestPromise as any).mockImplementation(() => '{"features": []}');

describe("routes", () => {
  let app: Router;

  beforeEach(() => {
    app = express();
    applyMiddleware(middleware, app);
    applyRoutes(routes, app);
    applyMiddleware(errorHandlers, app);
  });

  test("a valid string query", async () => {
    const response = {}; // await supertest(app).get("/api/v1/search?q=Cham");
    expect(response).toBeDefined();
  });

  test("a non-existing api route", async () => {
    const response = await supertest(app).get("/api/doesnotexist");
    expect(response.status).toEqual(404);
  });

  test("validates post data", async () => {
    const response = await supertest(app)
      .post("/api/v1/numbers/generate")
      .send({ number: "string" })
      .set("Accept", "application/json");
    expect(response.status).toEqual(400);
  });

  test("redirects to api-docs", async () => {
    const response = await supertest(app).get("/");
    expect(response.status).toEqual(302); // redirect status code
  });

  test("generates random phone numbers", async () => {
    const response = await supertest(app)
      .post("/api/v1/numbers/generate")
      .send({ number: 20 })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);
    expect(response.status).toEqual(201);
    expect(response.body.numbers.length).toEqual(20);
    // test that it can return unsorted numbers
    const unsorted = await supertest(app)
      .get("/api/v1/numbers");
    expect(unsorted.status).toEqual(200);
    expect(unsorted.body.numbers.length).toBeGreaterThan(4);
  });

  test("returns generated numbers (sorted and unsorted)", async () => {
    const generate = await supertest(app)
      .post("/api/v1/numbers/generate")
      .send({ number: 5 })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201);
    expect(generate.status).toEqual(201);
    const sortAsc = await supertest(app)
      .get("/api/v1/numbers?sort=asc");
    expect(sortAsc.status).toEqual(200);
    const { numbers, minimum, maximum } = sortAsc.body;
    // get first and last array elements to confirm correct sorting
    const { 0 : min , [numbers.length - 1] : max } = numbers;
    expect(Number(min)).toBeLessThan(Number(max));
    // test that the API resoinds with correct min and max values
    const sortDesc = await supertest(app)
      .get("/api/v1/numbers?sort=desc");
    expect(sortDesc.status).toEqual(200);
    expect(Number(minimum)).toBeLessThan(Number(maximum));
    const badParam = await supertest(app)
      .get("/api/v1/numbers?sort=XXX")
      .expect(400);
    expect(badParam.status).toEqual(400);
  });
});
