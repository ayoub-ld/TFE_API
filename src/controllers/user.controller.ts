import type { Request, Response } from "express";

const userController = {
  login: async (req: Request, res: Response) => {
    res.sendStatus(502);
  },
};

export default userController;
