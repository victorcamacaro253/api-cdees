import { Router } from 'express';
import empleadosController from '../controller/EmpleadosController.js';
import authenticateToken from '../middleware/authenticationToken.js';


const router = Router();


//Ruta para obtener todos los empleados de la base de datos
router.get('/empleados',empleadosController.getAllEmpleados);

//Ruta para obtener los empleados activos
router.get('/empleados/activo',empleadosController.getEmpleadosActivos)



//Ruta para obtener todos los empleados por id
router.get('/empleados/:id',empleadosController.getEmpleadoById)

//Ruta para actualizar el empleado 
router.put('/empleados/:id',empleadosController.updateEmpleado)

router.post('/empleados',empleadosController.checkUserExists,empleadosController.addEmpleado)

router.delete('/empleados/:id',empleadosController.deleteEmpleado);



export default router;