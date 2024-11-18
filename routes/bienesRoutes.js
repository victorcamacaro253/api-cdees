import { Router } from 'express';
import bienesController from '../controller/bienesController.js'


const router = Router();


//Ruta para obtener bienes por departamento
router.get('/departamento/',bienesController.getBienesByDepartamento)

//Ruta para obtener los bienes 
router.get('/',bienesController.getBienes)


//Ruta para obtener los bienes que estan activos
router.get('/estatus',bienesController.getBienesActivo);

//Ruta para obtener los bienes por id
router.get('/:id',bienesController.getBienesById)

//Ruta para actualizar bienes 
router.put('/:id',bienesController.updateBienes)

//Ruta para cambiar el estatus del bien
router.put('/cambiar/:id',bienesController.cambiarStatusBien);

//Ruta para agregar multiples bienes
router.post('/',bienesController.addMultipleBienes) 

//Ruta para eliminar multiples bienes
router.post('/deleteMultipleBienes',bienesController.deleteMultipleBienes);

//Ruta para eliminar un bien 
router.delete('/:id',bienesController.deleteBien);


export default router


