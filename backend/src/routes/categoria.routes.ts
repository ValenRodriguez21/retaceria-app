import { Router } from 'express'
import * as categoriaController from '../controllers/categoria.controller'

const router = Router()

router.get("/", categoriaController.obtenerCategorias)
router.get("/:id", categoriaController.obtenerCategoria)
router.post("/", categoriaController.crearCategoria)
router.put("/:id", categoriaController.editarCategoria)
router.delete("/:id", categoriaController.eliminarCategoria)

export default router