import { pool } from '../config/db'
import { crearProveedorDTO } from '../types/proveedores.types'

export async function obtenerProveedores() {
    const result = await pool.query(`
        SELECT 
            id,
            nombre,
            telefono,
            direccion
        FROM proveedores
    `)
    return result.rows
}

export async function obtenerProveedor(id: number) {
    const result = await pool.query(`
        SELECT 
            id,
            nombre,
            telefono,
            direccion
        FROM proveedores
        WHERE id = $1
    `, [id])
    return result.rows[0]
}

export async function crearProveedor(proveedor: crearProveedorDTO) { 
    const result = await pool.query(`
        INSERT INTO proveedores (nombre, telefono, direccion)
        VALUES ($1, $2, $3)
        RETURNING *
    `, [proveedor.nombre, proveedor.telefono, proveedor.direccion])
    return result.rows[0]
}

export async function editarProveedor(id: number, proveedor: crearProveedorDTO) {
    const result = await pool.query(`
        UPDATE proveedores
        SET nombre = $1, telefono = $2, direccion = $3
        WHERE id = $4
        RETURNING *
    `, [proveedor.nombre, proveedor.telefono, proveedor.direccion, id])
    return result.rows[0]
}

export async function eliminarProveedor(id: number) {
    const result = await pool.query(`
        DELETE FROM proveedores
        WHERE id = $1
    `, [id])
    return result.rows[0]
}
