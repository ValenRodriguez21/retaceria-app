import { Router } from 'express'
import * as productosController from '../controllers/productos.controller'

const router = Router()

router.get("/", productosController.obtenerProductos)
router.get("/:id", productosController.obtenerProducto)
router.post("/", productosController.crearProducto)
router.put("/:id", productosController.editarProducto)
router.delete("/:id", productosController.eliminarProducto)

export default router;