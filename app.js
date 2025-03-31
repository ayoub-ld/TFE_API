import express from "express";
import cors from "cors";
import morgan from "morgan";

const { NODE_ENV, PORT } = process.env;
const app = express();

// app middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

// server
app.listen(PORT, () => {
	console.log(`🚀 Server is running on port ${PORT} in ${NODE_ENV} mode`);
});
