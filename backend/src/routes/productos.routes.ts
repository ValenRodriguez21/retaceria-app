import { Router } from 'express'
import * as productosController from '../controllers/productos.controller'

const router = Router()

router.get("/", productosController.getProductos)
router.get("/:id", productosController.getProductoById)
router.post("/", productosController.createProducto)
router.put("/:id", productosController.updateProducto)
router.delete("/:id", productosController.deleteProducto)

