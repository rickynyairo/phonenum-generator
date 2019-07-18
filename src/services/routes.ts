import { Request, Response } from "express";
import { checkSearchParams } from "../middleware/checks";
import { GeneratorController } from "./controllers";

export default [
  {
    path: "/",
    method: "get",
    handler: async (_req: Request, res: Response) => {
      // redirect user to the api docs
      res.redirect("/api-docs");
    }
  },
  {
    path: "/api/v1/search",
    method: "get",
    handler: [
      checkSearchParams,
      async (_req: Request, res: Response) => {
        // TO-DO
        // Search for numbers
      }
    ]
  },
  {
    path: "/api/v1/numbers/generate",
    method: "post",
    handler: GeneratorController.generateNumbers
  },
  {
    path: "/api/v1/numbers",
    method: "get",
    handler: [
      checkSearchParams,
      GeneratorController.sortNumbers
    ]
  }
];