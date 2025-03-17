import winston, { transports } from "winston";

const transport = new winston.transports.Console({
  level: "info",
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return timestamp + " " + level + ": " + message;
    })
  ),
});

export const logger = winston.createLogger({
  transports: [
    new transports.File({
      maxsize: 5120000 * 5,
      maxFiles: 500,
      format: winston.format.combine(
        winston.format.simple(),
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} ${level}: ${message}`;
        })
      ),
      filename: `${__dirname}/../logs/app.log`,
    }),
    transport,
  ],
});
