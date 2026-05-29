import { Router } from 'express'
import * as proveedoresController from '../controllers/proveedores.controller';

const router = Router()

router.get("/", proveedoresController.obtenerProveedores)
router.get("/:id", proveedoresController.obtenerProveedor)
router.post("/", proveedoresController.crearProveedor)
router.put("/:id", proveedoresController.editarProveedor)
router.delete("/:id", proveedoresController.eliminarProveedor)

export default router