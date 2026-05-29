import { Router } from 'express'
import * as ventasController from '../controllers/ventas.controller'

const router = Router()

// Rutas para ventas
router.get("/", ventasController.obtenerVentas)
router.get("/:id", ventasController.obtenerVenta)
router.post("/", ventasController.crearVenta)
router.put("/:id", ventasController.editarVenta)
router.delete("/:id", ventasController.eliminarVenta)

export default router