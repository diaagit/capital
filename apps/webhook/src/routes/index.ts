import express, { type Router } from "express";
import transactionRouter from "./transaction";

const app: Router = express();

app.use("/transaction", transactionRouter);

export default app;
