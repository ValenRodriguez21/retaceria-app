import { pool } from '../config/db'
import { crearVentaDTO } from '../types/ventas.types'

//flujo de crearVenta() = Buscar productos, Verificar stock, Calcular total, Crear venta,Crear detalles,Descontar stock
export async function crearVenta(venta: crearVentaDTO) {

    let total = 0

    // Verificar productos y calcular total
    for (const item of venta.productos) {

        const productoResult = await pool.query(
            'SELECT * FROM productos WHERE id = $1',
            [item.id_producto]
        )

        const producto = productoResult.rows[0]

        if (!producto) {
            throw new Error(`Producto ${item.id_producto} no encontrado`)
        }

        if (producto.stock < item.cantidad) {
            throw new Error(
                `Stock insuficiente para ${producto.nombre}`
            )
        }

        const subtotal = producto.precio_base * item.cantidad

        total += subtotal
    }

    // Crear venta
    const ventaResult = await pool.query(`
        INSERT INTO ventas (tipo_pago, total)
        VALUES ($1, $2)
        RETURNING *
    `, [venta.tipo_pago, total])

    const ventaCreada = ventaResult.rows[0]
    const idVenta = ventaCreada.id

    // Crear detalles y descontar stock
    for (const item of venta.productos) {

        const productoResult = await pool.query(
            'SELECT * FROM productos WHERE id = $1',
            [item.id_producto]
        )

        const producto = productoResult.rows[0]

        const subtotal =
            producto.precio_base * item.cantidad

        await pool.query(`
            INSERT INTO detalle_ventas (
                venta_id,
                producto_id,
                cantidad,
                precio_unitario,
                subtotal
            )
            VALUES ($1, $2, $3, $4, $5)
        `, [
            idVenta,
            item.id_producto,
            item.cantidad,
            producto.precio_base,
            subtotal
        ])

        await pool.query(`
            UPDATE productos
            SET stock = stock - $1
            WHERE id = $2
        `, [
            item.cantidad,
            item.id_producto
        ])
    }

    return ventaCreada
}

//obtener todas las ventas
export async function obtenerVentas() {
    const result = await pool.query('SELECT * FROM ventas')
    return result.rows
}

//obtener una venta y sus detalles
export async function obtenerVenta(id: number) {
    const result = await pool.query(`
        SELECT 
            v.*,
            dv.producto_id,
            dv.cantidad,
            dv.precio_unitario,
            dv.subtotal
        FROM ventas v
        LEFT JOIN detalle_ventas dv ON v.id = dv.venta_id
        WHERE v.id = $1
    `, [id])
    
    //devuelvo el resultado en formato lindo
    const rows = result.rows

    if (rows.length === 0) {
        return null
    }

    return {
        id: rows[0].id,
        fecha: rows[0].fecha,
        tipo_pago: rows[0].tipo_pago,
        total: rows[0].total,
        detalles: rows.map(row => ({
            producto_id: row.producto_id,
            cantidad: row.cantidad,
            precio_unitario: row.precio_unitario,
            subtotal: row.subtotal
        }))
    }
}
