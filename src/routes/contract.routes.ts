import { Router } from "express";
import {
  add_contract,
  edit_contract,
} from "../controllers/contract.controllers";

const router = Router();

router.post("/add", add_contract);
router.put("/edit", edit_contract);

export default router;
