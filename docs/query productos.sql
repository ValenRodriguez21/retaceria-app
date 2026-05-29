CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE colores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE proveedores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(50),
    email VARCHAR(100),
    direccion VARCHAR(150)
);

CREATE TABLE tipos_pago (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    recargo NUMERIC(5,2) NOT NULL
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,

    codigo VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,

    precio_base NUMERIC(10,2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,

    categoria_id INTEGER REFERENCES categorias(id),
    color_id INTEGER REFERENCES colores(id),
    proveedor_id INTEGER REFERENCES proveedores(id)
);

INSERT INTO productos(
    codigo,
    nombre,
    precio_base,
    stock,
    categoria_id,
    color_id,
    proveedor_id
)
VALUES (
    'A200',
    'Lino Negro',
    12000,
    15,
    2,
    2,
    1
);

INSERT INTO categorias(nombre)
VALUES
('Jean'),
('Lino'),
('Algodón');

INSERT INTO colores(nombre)
VALUES
('Azul'),
('Negro'),
('Blanco');

INSERT INTO proveedores(
    nombre,
    telefono,
    email,
    direccion
)
VALUES (
    'Textiles Sur',
    '2241-555555',
    'contacto@textiles.com',
    'Chascomús'
);

SELECT *
FROM colores

CREATE TABLE ventas (
    id SERIAL PRIMARY KEY,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo_pago VARCHAR(50) NOT NULL,
    total DECIMAL(10,2) NOT NULL
);

CREATE TABLE detalle_ventas (
    id SERIAL PRIMARY KEY,

    venta_id INTEGER NOT NULL,
    producto_id INTEGER NOT NULL,

    cantidad INTEGER NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_venta
        FOREIGN KEY (venta_id)
        REFERENCES ventas(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_producto
        FOREIGN KEY (producto_id)
        REFERENCES productos(id)
);
