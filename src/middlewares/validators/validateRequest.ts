import { validationResult } from "express-validator";
import { standarResponse } from "../../utils/standarResponse";
import { Request, Response, NextFunction } from "express";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req);
  if (!error.isEmpty())
    return standarResponse({
      res,
      status: 400,
      message: "Hubo un error al enviar los campos",
      data: error.array(),
    });
  next();
};
