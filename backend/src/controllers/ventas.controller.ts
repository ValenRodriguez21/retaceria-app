import{Request, Response} from 'express'
import * as ventasService from '../services/ventas.services'

//crear venta
export async function crearVenta(req: Request, res: Response) {
    try {
        const venta = await ventasService.crearVenta(req.body);
        res.json(venta);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//obtener todas las ventas
export async function obtenerVentas(req: Request, res: Response) {
    try {
        const ventas = await ventasService.obtenerVentas();
        res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//obtener una venta
export async function obtenerVenta(req: Request, res: Response) {
    try {
        const venta = await ventasService.obtenerVenta(Number(req.params.id));
        res.json(venta);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

