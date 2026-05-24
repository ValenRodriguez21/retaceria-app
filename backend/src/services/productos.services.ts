import { pool } from '../config/db'

export async function getProductos() {

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