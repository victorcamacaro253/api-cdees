import { Router } from "express";
import cargosControllers from  "../controller/cargosController.js";



const router=  Router();

//Ruta para obtener todos los cargos
router.get('/',cargosControllers.getCargos)

//Ruta para obtener un cargo por SU nombre
router.get('/name',cargosControllers.getCargoByName)

//Ruta para obtener los cargos por tipo
router.get('/type',cargosControllers.getCargosByType)

//Ruta para obtener las estadisticas de los cargos
router.get('/stats',cargosControllers.getEstadisticas)

//Ruta para obtener un cargo por su id
router.get('/:id',cargosControllers.getCargoById)


//Ruta para crear un nuevo cargo
router.post('/',cargosControllers.createCargo)

//Ruta para crear umultiples cargo
router.post('/add',cargosControllers.addMultipleCargos)

router.post('/delete',cargosControllers.deleteMultipleCargos)

//Ruta para actulizar un cargo
router.put('/:id',cargosControllers.updateCargo)

//Ruta para eliminar un cargo
router.delete('/:id',cargosControllers.deleteCargo)


export default router

