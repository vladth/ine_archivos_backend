import { Response } from "express";
import { logger } from "./winston";

type Props = {
  res: Response;
  status?: number;
  message: string;
  data?: any;
  error?: any;
};

export const standarResponse = ({
  res,
  status = 200,
  message = "",
  data = null,
  error = "",
}: Props) => {
  if (status >= 400) logger.info(`${error} - ${message}`);
  res.status(status).json({
    message,
    data,
    status,
    success: status < 400,
  });
};
