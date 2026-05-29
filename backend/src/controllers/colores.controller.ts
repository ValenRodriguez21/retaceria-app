import { Request, Response } from 'express'
import * as coloresService from '../services/colores.services'

//obtener todos los colores
export async function obtenerColores(req: Request, res: Response) {
    try {
        const colores = await coloresService.obtenerColores();
        res.json(colores);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//obtener un color por id
export async function obtenerColor(req: Request, res: Response) {
    try {
        const color = await coloresService.obtenerColor(Number(req.params.id));
        res.json(color);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//crear un color
export async function crearColor(req: Request, res: Response) {
    try {
        const color = await coloresService.crearColor(req.body);
        res.json(color);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//editar un color
export async function editarColor(req: Request, res: Response) {
    try {
        const color = await coloresService.editarColor(Number(req.params.id), req.body);
        res.json(color);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//eliminar un color
export async function eliminarColor(req: Request, res: Response) {
    try {
        const color = await coloresService.eliminarColor(Number(req.params.id));
        res.json(color);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
