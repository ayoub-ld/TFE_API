import { Router } from "express";
import userRouter from "./user.router";
import postRouter from "./post.router";
import likeRouter from "./like.router";

const apiRouter = Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/post", postRouter);
apiRouter.use("/like", likeRouter);

export default apiRouter;
