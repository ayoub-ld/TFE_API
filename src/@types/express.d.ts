import type { TokenData } from "../utils/jwt.utils";

declare global {
  namespace Express {
    export interface Request {
      // Auth middleware
      token: TokenData | null;

      // Body validator middleware
      data?: object;
    }
  }
}
