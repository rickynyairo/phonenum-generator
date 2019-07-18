import { Request, Response } from "express";
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
    path: "/api/v1/numbers/generate",
    method: "post",
    handler: GeneratorController.generateNumbers
  },
  {
    path: "/api/v1/numbers",
    method: "get",
    handler: [
      GeneratorController.allNumbers,
      GeneratorController.sortNumbers
    ]
  }
];