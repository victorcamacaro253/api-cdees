import { Router } from 'express';
import bienesController from '../controller/bienesController.js'


const router = Router();


//Ruta para obtener bienes por departamento
router.get('/bienes/departamento/',bienesController.getBienesByDepartamento)

//Ruta para obtener los bienes 
router.get('/bienes',bienesController.getBienes)


//Ruta para obtener los bienes que estan activos
router.get('/bienes/estatus',bienesController.getBienesActivo);

//Ruta para obtener los bienes por id
router.get('/bienes/:id',bienesController.getBienesById)

//Ruta para actualizar bienes 
router.put('/bienes/:id',bienesController.updateBienes)

//Ruta para cambiar el estatus del bien
router.put('/bienes/cambiar/:id',bienesController.cambiarStatusBien);

//Ruta para eliminar un bien 
router.delete('/bienes/:id',bienesController.deleteBien);


export default router


