import dotenv from "dotenv";
import express, { type Express } from "express";
import morgan from "morgan";
import transactionRouter from "./transaction";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(morgan("dev"));
app.use("/webhook", transactionRouter);

app.listen(port, () => {});
