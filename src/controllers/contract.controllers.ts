import { Request, Response } from "express";
import { standarResponse } from "../utils/standarResponse";
import { Contract } from "../models/contract.models";
import { pool } from "../config/conexion";
import ActiveDirectory from "activedirectory2";

const loadDataContract = (data: Contract): { values: any[] } => {
  const {
    n_carpeta,
    n_tomo,
    nota_ine,
    nota_aceptacion,
    codigo_proceso,
    hoja_ruta,
    modalidad_contrato,
    area_solicitud,
    cargo_consultoria,
    departamento,
    PAC,
    FUC,
    POA,
    fecha_certificacion,
    n_certificacion,
    monto_total_cargo,
    area,
    UTC,
    nombre_adjudicado,
    n_cedula,
    codigo_contrato,
    n_contrato,
    fecha_suscp_contrato,
    fecha_concl_contrato,
    fecha_resolucion,
    hr_resolucion,
    CUCE,
    RUPE,
    responsable_proceso,
    ubicacion_documento,
    observaciones,
  } = data;

  const values = [
    n_carpeta,
    n_tomo,
    nota_ine,
    nota_aceptacion,
    codigo_proceso,
    hoja_ruta,
    modalidad_contrato,
    area_solicitud,
    cargo_consultoria,
    departamento,
    PAC,
    FUC,
    POA,
    fecha_certificacion,
    n_certificacion,
    monto_total_cargo,
    area,
    UTC,
    nombre_adjudicado,
    n_cedula,
    codigo_contrato,
    n_contrato,
    fecha_suscp_contrato,
    fecha_concl_contrato,
    fecha_resolucion,
    hr_resolucion,
    CUCE,
    RUPE,
    responsable_proceso,
    ubicacion_documento,
    observaciones,
  ];

  return { values };
};

const config = {
  url: "ldap://10.1.0.39",
  baseDN: "DC=ine,DC=gov,DC=bo",
  username: "authcnpv@ine.gov.bo",
  password: "G4rfunk3l",
};

export const add_contract = async (req: Request, res: Response) => {
  try {
    const { values } = loadDataContract(req.body);

    const query = `
        INSERT INTO contrataciones (
          n_carpeta, n_tomo, nota_ine, nota_aceptacion, codigo_proceso, hoja_ruta,
          modalidad_contrato, area_solicitud, cargo_consultoria, departamento, PAC, FUC, POA,
          fecha_certificacion, n_certificacion, monto_total_cargo, area, UTC, nombre_adjudicado,
          n_cedula, codigo_contrato, n_contrato, fecha_suscp_contrato, fecha_concl_contrato, fecha_resolucion,
          hr_resolucion, CUCE, RUPE, responsable_proceso, ubicacion_documento, observaciones
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19,
          $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31
        ) RETURNING *;
      `;

    const { rows } = await pool.query(query, values);

    return standarResponse({
      res,
      message: "Contrato registrado correctamente",
      data: rows[0],
    });
  } catch (error) {
    return standarResponse({
      res,
      status: 500,
      message: "Ocurrio un error inesperado",
      error,
    });
  }
};

export const edit_contract = async (req: Request, res: Response) => {
  try {
    const { id_contratacion } = req.body;
    const { values } = loadDataContract(req.body);

    values.push(id_contratacion);
    const query = `
    UPDATE contrataciones SET n_carpeta = $1, n_tomo = $2, nota_ine = $3, nota_aceptacion = $4, codigo_proceso = $5, hoja_ruta = $6, modalidad_contrato = $7, area_solicitud = $8, 
    cargo_consultoria = $9, departamento = $10, PAC = $11, FUC = $12, POA = $13, fecha_certificacion = $14, n_certificacion = $15, monto_total_cargo = $16,
    area = $17, UTC = $18, nombre_adjudicado = $19, n_cedula = $20, codigo_contrato = $21, n_contrato = $22, fecha_suscp_contrato = $23, fecha_concl_contrato = $24,
    fecha_resolucion = $25, hr_resolucion = $26, CUCE = $27, RUPE = $28, responsable_proceso = $29, ubicacion_documento = $30, observaciones = $31 WHERE id_contratacion = $32 RETURNING *;`;

    const result = await pool.query(query, values);

    if (result.rowCount === 0)
      return standarResponse({
        res,
        status: 404,
        message:
          "No se pudo realizar la actualización, hubo un error en el envio de datos",
      });

    return standarResponse({
      res,
      message: "Contrato actualizado correctamente",
      data: result.rows[0],
    });
  } catch (error) {
    return standarResponse({
      res,
      status: 500,
      message: "Ocurrio un error inesperado",
      error,
    });
  }
};
