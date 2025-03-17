import { Router } from "express";
import userRouter from "./user.routes";
import { isAuth } from "../middlewares/auth";
import loginRouter from "./auth.routes";
import contractRouter from "./contract.routes";

const router = Router();

router.use("/auth", loginRouter);
router.use("/user", userRouter);
router.use("/contract", contractRouter);

export default router;
