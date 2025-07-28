import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

export const app: Express = express();
export const port = process.env.PORT || 3001;

app.use(express.json());
app.use(morgan("dev"));

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send("<h1>Hello World!</h1>");
});

app.get("/pid", (req: Request, res: Response) => {
  res.send(`The process id is ${process.pid}!`);
});
