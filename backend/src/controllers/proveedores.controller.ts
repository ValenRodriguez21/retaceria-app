import { Request, Response } from 'express'
import * as proveedoresService from '../services/proveedores.services';

//obtener todos los proveedores
export async function obtenerProveedores(req: Request, res: Response) {
    try {
        const proveedores = await proveedoresService.obtenerProveedores();
        res.json(proveedores);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//obtener un proveedor por id
export async function obtenerProveedor(req: Request, res: Response) {
    try {
        const proveedor = await proveedoresService.obtenerProveedor(Number(req.params.id));
        res.json(proveedor);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//crear un proveedor
export async function crearProveedor(req: Request, res: Response) {
    try {
        const proveedor = await proveedoresService.crearProveedor(req.body);
        res.json(proveedor);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//editar un proveedor
export async function editarProveedor(req: Request, res: Response) {
    try {
        const proveedor = await proveedoresService.editarProveedor(Number(req.params.id), req.body);
        res.json(proveedor);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//eliminar un proveedor
export async function eliminarProveedor(req: Request, res: Response) {
    try {
        const proveedor = await proveedoresService.eliminarProveedor(Number(req.params.id));
        res.json(proveedor);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
