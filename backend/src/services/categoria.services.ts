import {pool} from '../config/db'
import {crearCategoriaDTO} from '../types/categoria.types'

export async function obtenerCategorias() {
    const result = await pool.query('SELECT * FROM categorias')
    return result.rows
}

export async function obtenerCategoria(id: number) {
    const result = await pool.query('SELECT * FROM categorias WHERE id = $1', [id])
    return result.rows[0]
}

export async function crearCategoria(categoria: crearCategoriaDTO) {
    const result = await pool.query('INSERT INTO categorias (nombre) VALUES ($1) RETURNING *', [categoria.nombre])
    return result.rows[0]
}

export async function editarCategoria(id: number, categoria: crearCategoriaDTO) {
    const result = await pool.query('UPDATE categorias SET nombre = $1 WHERE id = $2 RETURNING *', [categoria.nombre, id])
    return result.rows[0]
}

export async function eliminarCategoria(id: number) {
    const result = await pool.query('DELETE FROM categorias WHERE id = $1 RETURNING *', [id])
    return result.rows[0]
}
