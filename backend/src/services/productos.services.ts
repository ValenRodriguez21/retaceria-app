import { pool } from '../config/db'
import { crearProductoDTO } from '../types/productos.types'

export async function obtenerProductos() {

    const result = await pool.query(`
        SELECT 
            p.id,
            p.codigo,
            p.nombre,
            p.precio_base,
            p.stock,

            c.nombre AS categoria,
            co.nombre AS color,
            pr.nombre AS proveedor

        FROM productos p

        LEFT JOIN categorias c
            ON p.categoria_id = c.id

        LEFT JOIN colores co
            ON p.color_id = co.id

        LEFT JOIN proveedores pr
            ON p.proveedor_id = pr.id
    `)

    return result.rows
}

export async function obtenerProducto(id: number) {
    const result = await pool.query(`
        SELECT 
            p.id,
            p.codigo,
            p.nombre,
            p.precio_base,
            p.stock,

            c.nombre AS categoria,
            co.nombre AS color,
            pr.nombre AS proveedor

        FROM productos p

        LEFT JOIN categorias c
            ON p.categoria_id = c.id

        LEFT JOIN colores co
            ON p.color_id = co.id

        LEFT JOIN proveedores pr
            ON p.proveedor_id = pr.id

        WHERE p.id = $1
    `, [id])

    return result.rows[0]
}


export async function crearProducto(product: crearProductoDTO) {
    const result = await pool.query(`
        INSERT INTO productos (codigo, nombre, precio_base, stock, categoria_id, color_id, proveedor_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
    `, [product.codigo, product.nombre, product.precio_base, product.stock, product.categoria_id, product.color_id, product.proveedor_id])

    return result.rows[0]
}

export async function editarProducto(id: number, product: crearProductoDTO) {
    const result = await pool.query(`
        UPDATE productos
        SET codigo = $1, nombre = $2, precio_base = $3, stock = $4, categoria_id = $5, color_id = $6, proveedor_id = $7
        WHERE id = $8 
        RETURNING *
    `, [product.codigo, product.nombre, product.precio_base, product.stock, product.categoria_id, product.color_id, product.proveedor_id, id])

    return result.rows[0]
}

export async function eliminarProducto(id: number) {
    const result = await pool.query(`
        DELETE FROM productos
        WHERE id = $1
        RETURNING *
    `, [id])

    return result.rows[0]
}


