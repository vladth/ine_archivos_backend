CREATE DATABASE IF NOT EXISTS doc_system;

CREATE TABLE usuarios(
    id_usuario      SERIAL PRIMARY KEY,
    nombres         VARCHAR(100) NOT NULL,
    apellidos       VARCHAR(100) NOT NULL,
    cedula          VARCHAR(10) UNIQUE NOT NULL,
    telefono        VARCHAR(20) NOT NULL,
    usuario         VARCHAR(100) UNIQUE NOT NULL,
    contrasenia     TEXT NOT NULL,
    rol             INT,
    estado          SMALLINT DEFAULT 1 CHECK (estado IN (0, 1))
);


CREATE TABLE contrataciones(
    id_contratacion         SERIAL PRIMARY KEY,
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




-- Table: public.seg_usuario

-- DROP TABLE IF EXISTS public.seg_usuario;

CREATE TABLE IF NOT EXISTS public.seg_usuario
(
    id_usuario integer NOT NULL DEFAULT nextval(('public.seg_usuario_id_seq'::text)::regclass),
    id_rol integer,
    id_departamento integer,
    id_brigada integer NOT NULL DEFAULT '-1'::integer,
    login character varying(20) COLLATE pg_catalog."default",
    password character varying(100) COLLATE pg_catalog."default",
    nombre text COLLATE pg_catalog."default",
    telefono numeric(8,0),
    foto character varying(200) COLLATE pg_catalog."default",
    estado character varying(60) COLLATE pg_catalog."default" NOT NULL DEFAULT 'ELABORADO'::character varying,
    usucre character varying(60) COLLATE pg_catalog."default" NOT NULL,
    feccre timestamp without time zone NOT NULL DEFAULT now(),        
    a_departamento text COLLATE pg_catalog."default",
    a_brigada text COLLATE pg_catalog."default",
    serie character varying(20) COLLATE pg_catalog."default" DEFAULT '-'::character varying,

    CONSTRAINT seg_usuario_pk_usuario PRIMARY KEY (id_usuario),
    CONSTRAINT seg_usuario_login_key UNIQUE (login),
    CONSTRAINT seg_usuario_id_departamento_fkey FOREIGN KEY (id_departamento)
        REFERENCES public.cat_departamento (id_departamento) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE IF NOT EXISTS public.seg_rol
(
    id_rol integer NOT NULL DEFAULT nextval(('public.seg_rol_id_seq'::text)::regclass),
    sigla character varying(30) COLLATE pg_catalog."default" NOT NULL,
    descripcion character varying(60) COLLATE pg_catalog."default" NOT NULL,
    estado character varying(15) COLLATE pg_catalog."default" NOT NULL DEFAULT 'ELABORADO'::character varying,
    usucre character varying(15) COLLATE pg_catalog."default" NOT NULL,
    feccre timestamp without time zone NOT NULL DEFAULT now(),
    usumod character varying(15) COLLATE pg_catalog."default",
    fecmod timestamp without time zone,
    menu json,
    CONSTRAINT seg_rol_segroles_pk1 PRIMARY KEY (id_rol)
)




CREATE TABLE IF NOT EXISTS public.seg_usuario
(
    id_usuario SERIAL PRIMARY KEY,  -- Usamos SERIAL para manejar el autoincremento
    id_rol INTEGER,  
    id_departamento INTEGER,
    id_brigada INTEGER NOT NULL DEFAULT -1,  -- Corregimos el tipo y lo mantenemos como entero
    login VARCHAR(20) UNIQUE NOT NULL,  -- Hacemos login único y de tipo VARCHAR
    password VARCHAR(100) NOT NULL,  -- Mantuvimos el tipo de datos como VARCHAR
    nombre TEXT,  -- Usamos TEXT para un nombre variable
    telefono VARCHAR(15),  -- Usamos VARCHAR para el teléfono, permitiendo más flexibilidad (si los números incluyen caracteres como +)
    foto VARCHAR(200),  -- La foto es una cadena de texto para almacenar una URL o nombre de archivo
    estado VARCHAR(60) NOT NULL DEFAULT 'ELABORADO',  -- Estado como VARCHAR con valor por defecto
    usucre VARCHAR(60) NOT NULL,  -- Usuario de creación
    feccre TIMESTAMP DEFAULT now(),  -- Fecha de creación, por defecto ahora
    a_departamento TEXT,  -- Departamento adicional como texto
    a_brigada TEXT,  -- Brigada adicional como texto
    serie VARCHAR(20) DEFAULT '-',  -- Serie como texto con valor por defecto

    -- Clave foránea con el departamento
    CONSTRAINT seg_usuario_id_departamento_fkey FOREIGN KEY (id_departamento)
        REFERENCES public.cat_departamento (id_departamento)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);


CREATE TABLE IF NOT EXISTS public.seg_rol
(
    id_rol SERIAL PRIMARY KEY,  -- Usamos SERIAL para autoincrementar el ID
    sigla VARCHAR(30) NOT NULL,  -- Sigla como VARCHAR con longitud máxima
    descripcion VARCHAR(60) NOT NULL,  -- Descripción como VARCHAR
    estado VARCHAR(15) NOT NULL DEFAULT 'ELABORADO',  -- Estado con valor por defecto
    usucre VARCHAR(15) NOT NULL,  -- Usuario de creación
    feccre TIMESTAMP NOT NULL DEFAULT now(),  -- Fecha de creación por defecto
    usumod VARCHAR(15),  -- Usuario que modificó el registro
    fecmod TIMESTAMP,  -- Fecha de modificación
    menu JSON,  -- `menu` como tipo JSON

    -- Clave primaria para la tabla
    CONSTRAINT seg_rol_segroles_pk1 PRIMARY KEY (id_rol)
);


CREATE TABLE IF NOT EXISTS public.cat_departamento (
    id_departamento SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);
