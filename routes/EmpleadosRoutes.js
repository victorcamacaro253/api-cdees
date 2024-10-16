import { Router } from 'express';
import empleadosController from '../controller/EmpleadosController.js';
import authenticateToken from '../middleware/authenticationToken.js';
import upload from '../middleware/multerConfig.js';
import checkPermissions from '../middleware/checkPermissions.js';
import checkModuleAccess from '../middleware/checkModuleAccess.js';

const router = Router();

//Ruta para obtener los empleados por todos los departamentos
router.get('/empleados/departamento/', empleadosController.getEmpleadosByDepartamentos);

//Ruta para obtener los empleados por un especifico departamento
router.get('/empleados/departamento/dept',empleadosController.getEmpleadosByDepartamento);

//Ruta para obtener todos los empleados de la base de datos
router.get('/empleados',checkPermissions('read'),empleadosController.getAllEmpleados);

//Ruta para obtener los empleados activos
router.get('/empleados/activo',empleadosController.getEmpleadosActivos)


//Ruta para obtener los empleados por nombre
router.get('/empleados/nombre',empleadosController.getEmpleadoByName);

// Ruta para obtener empleados por rango de fechas de ingreso
router.get('/empleados/fecha', empleadosController.getEmpleadosByFechaIngreso);

//Ruta para obtener todos los empleados por id
router.get('/empleados/:id',empleadosController.getEmpleadoById)


//Ruta para actualizar empleados multiples
router.put('/empleados/updateMultipleEmpleados',upload.single('image'),empleadosController.updateMultipleEmpleados)


//Ruta para actualizar el empleado 
router.put('/empleados/:id',empleadosController.updateEmpleado)

//Ruta para agregar un empleado

router.post('/empleados',
authenticateToken,
empleadosController.checkUserExists,
checkModuleAccess(['rrhh','administracion']),
checkPermissions('create'),
empleadosController.addEmpleado)


//Ruta para agregar multiples empleados
router.post('/empleados/addMultipleEmpleados',upload.single('image'),authenticateToken,checkPermissions('create'),empleadosController.addMultipleEmpleados)

//Ruta para eliminar multiples empleados
router.post('/empleados/deleteMultipleEmpleados',empleadosController.deleteMultipleEmpleados);

//Ruta  para eliminar un empleado

router.delete('/empleados/:id',empleadosController.deleteEmpleado);

//Ruta para cambiar el estatus del trabajador

router.patch('/empleados/:id/estatus',empleadosController.statusEmpleado)

export default router;
