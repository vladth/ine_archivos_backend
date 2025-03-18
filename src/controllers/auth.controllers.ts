import { Request, Response } from "express";
import { generateToken } from "../utils/tokenStruct";
import ActiveDirectory from "activedirectory2";
import { standarResponse } from "../utils/standarResponse";
import { pool } from "../config/conexion";
import { configDirectory } from "../config/directory.config";

const authenticateUser = (username: string, password: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const ad = new ActiveDirectory(configDirectory);
    ad.authenticate(username, password, (err, auth) => {
      if (err) return resolve(false);
      resolve(auth);
    });
  });
};

export const login = async (req: Request, res: Response) => {
  try {
  const { username, password } = req.body;

  const auth = await authenticateUser(username+"@ine.gov.bo", password);
  
  if (!auth) 
    return standarResponse({
      res,
      message: "Las credenciales no son correctas",
      status: 404,
    });
  
  
  const stm = "SELECT * FROM usuarios WHERE estado = 1 AND nombre_usuario = $1";
  const { rows }: any = await pool.query(stm, [username]);

  if (rows.length === 0) {
    return standarResponse({
      res,
      status: 404,
      message:
        "Hola bienvenido, usted inició sesión correctamente, sin embargo, no se le asignó un rol. Comuníquese con su administrador.",
    });
  }
  
  const user = rows[0];
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
  console.error(error);
  return standarResponse({
    res,
    status:500,
    message: "Ocurrió un error inesperado",
    error,
  });
}
};