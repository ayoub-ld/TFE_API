import type { NextFunction, Request, Response } from "express";
import { decodeJWT } from "../utils/jwt.utils.js";

export function authenticationMiddleware() {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    //# Check if the request has an authorization header
    const token = req.headers["authorization"]?.split(" ")[1];

    //# If the token is not present, user isn't authenticated
    if (!token) {
      req.token = null;
      next();
      return;
    }

    try {
      req.token = await decodeJWT(token);
    } catch (error) {
      req.token = null;
    } finally {
      next();
    }
  };
}
