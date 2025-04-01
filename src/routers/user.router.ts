import { Router } from "express";
import type { Request, Response } from "express";

const userRouter = Router();

userRouter
  .route("/")
  .get((req: Request, res: Response) => {
    res.sendStatus(502);
  })
  .all((req: Request, res: Response) => {
    res.sendStatus(405);
  });

export default userRouter;
