import { Request, Response } from "express";
import { generateToken } from "../utils/tokenStruct";
import ActiveDirectory from "activedirectory2";
import { standarResponse } from "../utils/standarResponse";
import { pool } from "../config/conexion";
import { configDirectory } from "../config/directory.config";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const ad = new ActiveDirectory(configDirectory);
    ad.authenticate(username, password, function (err, auth) {
      if (err)
        return standarResponse({
          res,
          message: "Ocurrio un error inesperado",
          status: 500,
          error: err,
        });

      if (!auth)
        return standarResponse({
          res,
          message: "Las credenciales no son correctas",
          status: 404,
        });
    });

    const stm = "SELECT * FROM usuarios WHERE estado = 1 AND usuario = $1";

    const { rows }: any = await pool.query(stm, [username]);

    if (rows.length === 0)
      return standarResponse({
        res,
        status: 404,
        message:
          "Hola bienvenido, usted inicio session correctamente sin embargo no se le asigno un rol, comuniquese con su administrador",
      });

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
    console.log(error)
    return standarResponse({
      res,
      message: "Ocurrio un error inesperado",
      error,
    });
  }
};

// evmamani  rol: supadmin
// emedina   rol: supadmin
// nmeave    rol: archivos administrativos {a las primeras tareas}
// msvasquez rol: archivo documental {}
//           rol: tecnico{}
