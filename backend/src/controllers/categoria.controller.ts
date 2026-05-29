import {Request, Response} from 'express'
import * as categoriaService from '../services/categoria.services'

//obtener todas las categorias
export async function obtenerCategorias(req: Request, res: Response) {
    try {
        const categorias = await categoriaService.obtenerCategorias();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//obtener una categoria por id
export async function obtenerCategoria(req: Request, res: Response) {
    try {
        const categoria = await categoriaService.obtenerCategoria(Number(req.params.id));
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//crear una categoria
export async function crearCategoria(req: Request, res: Response) {
    try {
        const categoria = await categoriaService.crearCategoria(req.body);
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//editar una categoria
export async function editarCategoria(req: Request, res: Response) {
    try {
        const categoria = await categoriaService.editarCategoria(Number(req.params.id), req.body);
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//eliminar una categoria
export async function eliminarCategoria(req: Request, res: Response) {
    try {
        const categoria = await categoriaService.eliminarCategoria(Number(req.params.id));
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
