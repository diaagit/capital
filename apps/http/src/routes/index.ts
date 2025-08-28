import express, { type Router } from "express";
import userRouter from "./user";

const router: Router = express.Router();

router.use("/user", userRouter);

export default router;
