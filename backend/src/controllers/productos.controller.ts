import { Request, Response } from 'express';

import * as productosService from '../services/productos.service';

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
        const product = await productosService.obtenerProducto(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//crear un producto
export async function crearProducto(req: Request, res: Response) {
    try {
        const product = await productosService.crearProducto(req.body);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//actualizar un producto
export async function actualizarProducto(req: Request, res: Response) {
    try {
        const product = await productosService.actualizarProducto(req.params.id, req.body);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

//eliminar un producto
export async function eliminarProduct(req: Request, res: Response) {
    try {
        const product = await productosService.eliminarProducto(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}
