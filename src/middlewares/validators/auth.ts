import { check } from "express-validator";

export const loginValidator = [
  check("username", "El nombre de usuario es obligatorio").notEmpty().trim(),
  check("password", "La constraseña es obligatoria").notEmpty().trim(),
];
