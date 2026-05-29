import{Request, Response} from 'express'
import * as ventasService from '../services/ventas.services'

export async function crearVenta(req: Request, res: Response) {
    try {
        const venta = await ventasService.crearVenta(req.body);
        res.json(venta);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}