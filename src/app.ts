import express from "express";
import cors from "cors";
import morgan from "morgan";
import apiRouter from "./routers/index";

const { NODE_ENV, PORT } = process.env;
const app = express();

//_ app middleware
//# CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//_ routes
app.use("/api/v1", apiRouter);

//_ server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT} in ${NODE_ENV} mode`);
});
