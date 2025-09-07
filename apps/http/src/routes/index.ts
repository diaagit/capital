import express, { type Router } from "express";
import eventRouter from "./event";

import userRouter from "./user";
import organiserRouter from "./organiser";

const router: Router = express.Router();

router.use("/user", userRouter);
router.use("/events", eventRouter);
router.use("organiser", organiserRouter);

export default router;
