import express from "express";
import cors from "cors";
import morgan from "morgan";
import multer from "multer";
import indexRouter from "./routes/index.routes";
import { standarResponse } from "./utils/standarResponse";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const storage = multer.memoryStorage();

const upload = multer({
  limits: { fieldSize: 5000 * 1024 * 1024 },
  storage,
});

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));

app.use("/api", indexRouter);

app.use("*", (req, res) => {
  standarResponse({ res, message: "Error de envio 404" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
