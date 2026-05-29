import { pool } from '../config/db'
import { crearColorDTO } from '../types/colores.types'

export async function obtenerColores() {
    const result = await pool.query('SELECT * FROM colores')
    return result.rows
}

export async function obtenerColor(id: number) {
    const result = await pool.query('SELECT * FROM colores WHERE id = $1', [id])
    return result.rows[0]
}

export async function crearColor(color: crearColorDTO) {
    const result = await pool.query('INSERT INTO colores (nombre, codigo) VALUES ($1, $2) RETURNING *', [color.nombre])
    return result.rows[0]
}

export async function editarColor(id: number, color: crearColorDTO) {
    const result = await pool.query('UPDATE colores SET nombre = $1 WHERE id = $2 RETURNING *', [color.nombre, id])
    return result.rows[0]
}

export async function eliminarColor(id: number) {
    const result = await pool.query('DELETE FROM colores WHERE id = $1 RETURNING *', [id])
    return result.rows[0]
}
