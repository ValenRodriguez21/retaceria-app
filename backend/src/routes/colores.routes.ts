import { Router } from 'express'
import * as coloresController from '../controllers/colores.controller'

const router = Router()

router.get("/", coloresController.obtenerColores)
router.get("/:id", coloresController.obtenerColor)
router.post("/", coloresController.crearColor)
router.put("/:id", coloresController.editarColor)
router.delete("/:id", coloresController.eliminarColor)

export default router