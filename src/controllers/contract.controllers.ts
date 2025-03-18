import { Request, Response } from "express";
import { standarResponse } from "../utils/standarResponse";
import { Contract } from "../models/contract.models";
import { pool } from "../config/conexion";

const loadDataContract = (data: Contract): { values: any[] } => {
  const {
    n_carpeta,
    programa,
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
    programa,
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

export const add_contract = async (req: Request, res: Response) => {
  try {
    const { values } = loadDataContract(req.body);

    const query = `
    INSERT INTO contrataciones (
      n_carpeta, programa, n_tomo, nota_ine, nota_aceptacion, codigo_proceso, hoja_ruta, 
      modalidad_contrato, area_solicitud, cargo_consultoria, departamento, PAC, FUC, POA, 
      fecha_certificacion, n_certificacion, monto_total_cargo, area, UTC, nombre_adjudicado, 
      n_cedula, codigo_contrato, n_contrato, fecha_suscp_contrato, fecha_concl_contrato, fecha_resolucion,
      hr_resolucion, CUCE, RUPE, responsable_proceso, ubicacion_documento, observaciones
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, 
      $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32
    ) RETURNING *;
  `;

    const { rows } = await pool.query(query, values);

    return standarResponse({
      res,
      message: "Contrato registrado correctamente",
      data: rows[0],
    });
  } catch (error) {
    console.log(error);
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
    UPDATE contrataciones 
    SET n_carpeta = $1, programa = $2, n_tomo = $3, nota_ine = $4, nota_aceptacion = $5, codigo_proceso = $6, hoja_ruta = $7, 
        modalidad_contrato = $8, area_solicitud = $9, cargo_consultoria = $10, departamento = $11, PAC = $12, FUC = $13, POA = $14, 
        fecha_certificacion = $15, n_certificacion = $16, monto_total_cargo = $17, area = $18, UTC = $19, nombre_adjudicado = $20, 
        n_cedula = $21, codigo_contrato = $22, n_contrato = $23, fecha_suscp_contrato = $24, fecha_concl_contrato = $25, 
        fecha_resolucion = $26, hr_resolucion = $27, CUCE = $28, RUPE = $29, responsable_proceso = $30, ubicacion_documento = $31, 
        observaciones = $32 
    WHERE id_contratacion = $33 
    RETURNING *;`;

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
