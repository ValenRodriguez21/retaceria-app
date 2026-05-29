import { Request, Response } from 'express';

import * as productosService from '../services/productos.services';

//obtener todos los productos
export async function obtenerProductos(req: Request, res: Response) {
    try {
        const products = await productosService.obtenerProductos();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//obtener un producto por id
export async function obtenerProducto(req: Request, res: Response) {
    try {
        const producto = await productosService.obtenerProducto(Number(req.params.id));
        res.json(producto);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//crear un producto
export async function crearProducto(req: Request, res: Response) {
    try {
        const producto = await productosService.crearProducto(req.body);
        res.json(producto);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//actualizar un producto
export async function editarProducto(req: Request, res: Response) {
    try {
        const producto = await productosService.editarProducto(Number(req.params.id), req.body); //
        res.json(producto);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//eliminar un producto
export async function eliminarProducto(req: Request, res: Response) {
    try {
        const producto = await productosService.eliminarProducto(Number(req.params.id));
        res.json(producto);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
