import { Request, Response } from "express";
import { pool } from "../config/conexion";
import { Usuarios } from "../models/user.models";
import { standarResponse } from "../utils/standarResponse";
import bcrypt from "bcrypt";

export const getUsers = async (req: Request, res: Response) => {
  try {
    standarResponse({ res, message: "Usuarios obtenidos exitosamente" });
  } catch (error) {
    standarResponse({
      res,
      status: 500,
      message: "Ocurrio un error",
      error,
    });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      nombres,
      apellidos,
      cedula,
      telefono,
      usuario,
      contrasenia,
    }: Usuarios = req.body;

    const hashed_pwd = await bcrypt.hash(contrasenia, 10);

    const stm = `
        INSERT INTO usuarios (nombres, apellidos, cedula, telefono, usuario, contrasenia, rol)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `;

    const values = [
      nombres,
      apellidos,
      cedula,
      telefono,
      usuario,
      hashed_pwd,
      1,
    ];

    const { rows }: any = await pool.query(stm, values);
    delete rows.contrasenia;
    return standarResponse({
      res,
      message: "Usuario registrado correctamente",
      data: rows,
    });
  } catch (error: any) {
    return standarResponse({
      res,
      status: 500,
      message: error.detail || "Ocurrio un error inesperado",
      error,
    });
  }
};
