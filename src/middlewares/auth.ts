import { Request, Response, NextFunction } from "express";
import { standarResponse } from "../utils/standarResponse";
import { verifyToken } from "../utils/tokenStruct";

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.headers.authorization;
    if (!auth)
      return standarResponse({ res, status: 401, message: "No autorizado" });

    const token = auth.split("")[1];
    if (!token)
      return standarResponse({ res, status: 401, message: "No autorizado" });

    const payload = verifyToken(token);

    if (!payload)
      return standarResponse({
        res,
        status: 401,
        message: "El token es invalido",
      });

    req.userId = payload.userId;
    req.userName = payload.username;

    next();
  } catch (error) {
    return standarResponse({
      res,
      status: 500,
      message: "Error en el servidor",
      error,
    });
  }
};
