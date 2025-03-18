-- CREATE DATABASE IF NOT EXISTS doc_system;


CREATE TABLE roles(
    id_rol         SERIAL PRIMARY KEY,
    rol            VARCHAR(100) NOT NULL,
    estado         SMALLINT DEFAULT 1 CHECK (estado IN (0, 1))
);

INSERT INTO roles (rol)
VALUES 
    ('ADMINISTRADOR'),
    ('ARCHIVO ADMINISTRATIVO FINANCIERO'),
    ('ARCHIVO DOCUMENTAL'),
    ('TÉCNICO');

CREATE TABLE usuarios(
    id_usuario          SERIAL PRIMARY KEY,
    id_rol              INT NOT NULL,     
    nombre_completo     VARCHAR(100) NOT NULL,
    cedula              VARCHAR(10) UNIQUE NOT NULL,
    telefono            VARCHAR(20) NOT NULL,
    nombre_usuario      VARCHAR(100) NOT NULL,
    estado              SMALLINT DEFAULT 1 CHECK (estado IN (0, 1)),
    CONSTRAINT fk_roles_usuarios FOREIGN KEY (id_rol) REFERENCES roles (id_rol) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE contrataciones(
    id_contratacion         SERIAL PRIMARY KEY,
    programa                INT[],
    n_carpeta               VARCHAR(50),
    n_tomo                  VARCHAR(50),
    nota_ine                VARCHAR(100),    
    nota_aceptacion         VARCHAR(100),    
    codigo_proceso          VARCHAR(100),
    hoja_ruta               VARCHAR(100),
    modalidad_contrato      VARCHAR(100),
    area_solicitud          VARCHAR(100),
    cargo_consultoria       VARCHAR(100),
    departamento            VARCHAR(100),
    PAC                     VARCHAR(100),
    FUC                     VARCHAR(50),
    POA                     VARCHAR(100),
    fecha_certificacion     DATE,
    n_certificacion         VARCHAR(100),
    monto_total_cargo       DECIMAL(12,2),
    area                    VARCHAR(100),
    UTC                     VARCHAR(100),
    nombre_adjudicado       VARCHAR(100),
    n_cedula                VARCHAR(10),
    codigo_contrato         VARCHAR(100),
    n_contrato              VARCHAR(100),
    fecha_suscp_contrato    DATE,
    fecha_concl_contrato    DATE,
    fecha_resolucion        DATE,
    hr_resolucion           TIME,
    CUCE                    VARCHAR(100),
    RUPE                    VARCHAR(100),
    responsable_proceso     VARCHAR(100),
    ubicacion_documento     VARCHAR(100),
    observaciones           TEXT
);

CREATE TABLE modificacion_contrataciones (
    id_modificacion         SERIAL PRIMARY KEY,
    id_contratacion         INT,
    hr_modificacion         TIMESTAMP,
    fin_modificacion        TIMESTAMP,
    CONSTRAINT fk_modificacion_contratacion 
        FOREIGN KEY (id_contratacion) 
        REFERENCES contrataciones(id_contratacion) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

CREATE TABLE adquisiciones(
    id_adquisicion          SERIAL PRIMARY KEY,
    programa                INT[],
    n_carpeta               VARCHAR(50),
    n_tomo                  VARCHAR(50),
    nota_ine                VARCHAR(100),
    nota_aceptacion         VARCHAR(100),
    codigo_proceso          VARCHAR(100),
    hoja_ruta               VARCHAR(100),
    modalidad_contrato      VARCHAR(100),
    area_solicitud          VARCHAR(100),
    nombre_adquisicion      VARCHAR(200),
    departamento            VARCHAR(50),
    fecha_certificacion     DATE,
    n_certificacion         VARCHAR(100),
    monto_total_cargo       VARCHAR(100),
    adquisicion_servicio    VARCHAR(100),
    representante           VARCHAR(100),
    ci_representante        VARCHAR(100),
    codigo_contrato         VARCHAR(100),
    n_contrato              VARCHAR(100),
    fecha_suscp_contrato    DATE,
    fecha_concl_contrato    DATE,
    fin_modificatorio       VARCHAR(100),
    hr_modificatorio        VARCHAR(100),
    CUCE                    VARCHAR(50),
    n_servicio_compra       VARCHAR(50),
    fecha_orden_compra      DATE,
    conformidad             VARCHAR(100)
);

CREATE TABLE contabilidad(
    id_contabilidad         SERIAL PRIMARY KEY,
    programa                INT[],
    n_carpeta               VARCHAR(50),
    codigo_comprobante      VARCHAR(100),
    mes                     DATE,
    n_comprobante           VARCHAR(50),
    n_presupuestaria        VARCHAR(100),
    asunto                  TEXT,
    n_preventivo            VARCHAR(50),
    n_planilla              VARCHAR(50),
    hoja_ruta               VARCHAR(50),
    fojas                   VARCHAR(100),
    n_tot_carpetas          VARCHAR(50),
    nombre_productor        VARCHAR(200),
    ubicacion_ambiente      VARCHAR(200),
    num_proceso             VARCHAR(50),
    notas                   TEXT
);

CREATE TABLE registro(
    id_registro             SERIAL PRIMARY KEY,
    id_usuario              INT,
    id_contratacion         INT,
    id_adquisicion          INT,
    id_contabilidad         INT,
    fecha                   DATE,
    CONSTRAINT fk_reg_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_reg_contratacion FOREIGN KEY (id_contratacion) REFERENCES contrataciones (id_contratacion) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_reg_adquisiciones FOREIGN KEY (id_adquisicion) REFERENCES adquisiciones (id_adquisicion) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_reg_contabilidad FOREIGN KEY (id_contabilidad) REFERENCES contabilidad (id_contabilidad) ON DELETE CASCADE ON UPDATE CASCADE
);