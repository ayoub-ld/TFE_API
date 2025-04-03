import { Router } from "express";
import userRouter from "./user.router";
import postRouter from "./post.router";

const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/post", postRouter);

export default apiRouter;
