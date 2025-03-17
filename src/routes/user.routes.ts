import { Router } from "express";
import { getUsers, registerUser } from "../controllers/user.controllers";

const router = Router();

router.get("/", getUsers);
router.post("/add", registerUser);

export default router;
