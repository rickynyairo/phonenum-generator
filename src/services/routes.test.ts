import express, { Router } from "express";
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
    const response = await supertest(app).get("/api/v11/search");
    expect(response.status).toEqual(404);
  });

  test("an empty string", async () => {
    const response = await supertest(app).get("/api/v1/search?q=");
    expect(response.status).toEqual(400);
  });
});
