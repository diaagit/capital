import express, { type Router } from "express";
import eventRouter from "./event";
import userRouter from "./user";

const router: Router = express.Router();

router.use("/user", userRouter);
router.use("/events", eventRouter);

export default router;
