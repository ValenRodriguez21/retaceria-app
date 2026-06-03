// venta
export interface Venta {
    id: number
    fecha: Date
    tipo_pago: string
    total: number
}

export interface crearVentaDTO {
    tipo_pago: string
    productos: crearDetalleVentaDTO[]
}

// detalle venta
export interface DetalleVenta {
    id: number
    id_venta: number
    id_producto: number
    cantidad: number
    precio_unitario: number
    subtotal: number
}

export interface crearDetalleVentaDTO {
    id_producto: number
    cantidad: number
}

/*CREATE TABLE ventas (
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
    subtotal DECIMAL(10,2) NOT NULL, */