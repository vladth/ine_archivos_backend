import { Request, Response } from "express";
import { generateToken } from "../utils/tokenStruct";
import { standarResponse } from "../utils/standarResponse";
import bcrypt from "bcrypt";
import { pool } from "../config/conexion";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const stm = "SELECT * FROM usuarios WHERE estado = 1 AND usuario = $1";

    const { rows }: any = await pool.query(stm, [username]);

    if (rows.length === 0)
      return standarResponse({
        res,
        status: 400,
        message: "Usuario no encontrado",
        error: true,
      });

    const user = rows[0];

    const passwordMatch = await bcrypt.compare(password, user.contrasenia);

    if (!passwordMatch)
      return standarResponse({
        res,
        status: 400,
        message: "La contraseña es incorrecta",
        error: true,
      });

    const token = generateToken({
      userId: user.id_usuario,
      username: user.usuario,
      cedula: user.cedula,
    });

    return standarResponse({
      res,
      message: "Bienvenido al sistema",
      data: {
        usuario: user.usuario,
        cedula: user.cedula,
        token,
      },
    });
  } catch (error) {
    return standarResponse({
      res,
      message: "Ocurrio un error inesperado",
      error,
    });
  }
};
