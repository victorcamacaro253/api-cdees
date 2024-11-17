import { Router } from 'express';
import empleadosController from '../controller/EmpleadosController.js';
import authenticateToken from '../middleware/authenticationToken.js';
import upload from '../middleware/multerConfig.js';
import checkPermissions from '../middleware/checkPermissions.js';
import checkModuleAccess from '../middleware/checkModuleAccess.js';

const router = Router();

//Ruta para obtener los empleados por todos los departamentos
router.get('/departamento/:id', empleadosController.getEmpleadosByDepartamentos);

//Ruta para obtener los empleados por un especifico departamento
router.get('/departamento/dept',empleadosController.getEmpleadosByDepartamento);

//Ruta para obtener todos los empleados de la base de datos
router.get('/',checkPermissions('read'),empleadosController.getAllEmpleados);

//Ruta para obtener los empleados activos
router.get('/activo',empleadosController.getEmpleadosActivos)


//Ruta para obtener los empleados por nombre
router.get('/nombre',empleadosController.getEmpleadoByName);

// Ruta para obtener empleados por rango de fechas de ingreso
router.get('/fecha', empleadosController.getEmpleadosByFechaIngreso);

//Ruta para obtener todos los empleados por id
router.get('/:id',empleadosController.getEmpleadoById)


//Ruta para actualizar empleados multiples
router.put('/updateMultipleEmpleados',upload.single('image'),empleadosController.updateMultipleEmpleados)


//Ruta para actualizar el empleado 
router.put('/:id',empleadosController.updateEmpleado)

//Ruta para agregar un empleado

router.post('/',
authenticateToken,
empleadosController.checkUserExists,
checkModuleAccess(['rrhh','administracion']),
checkPermissions('create'),
empleadosController.addEmpleado)


//Ruta para agregar multiples empleados
router.post('/addMultipleEmpleados',upload.single('image'),authenticateToken,checkPermissions('create'),empleadosController.addMultipleEmpleados)

//Ruta para eliminar multiples empleados
router.post('/deleteMultipleEmpleados',empleadosController.deleteMultipleEmpleados);

//Ruta  para eliminar un empleado

router.delete('/:id',empleadosController.deleteEmpleado);

//Ruta para cambiar el estatus del trabajador

router.patch('/:id/estatus',empleadosController.statusEmpleado)

export default router;
