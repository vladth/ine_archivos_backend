import { Router } from "express";
import { loginValidator } from "../middlewares/validators/auth";
import { validateRequest } from "../middlewares/validators/validateRequest";
import { login } from "../controllers/auth.controllers";

const router = Router();

router.post("/login", loginValidator, validateRequest, login);

export default router;
