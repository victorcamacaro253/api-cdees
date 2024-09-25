import { Router } from 'express';
import administradoresController from '../controller/administradoresController.js';


const router = Router();


//Ruta para obtener los datos de los  administradores

router.get('/administradores',administradoresController.getAllAdministradores);

//Ruta para logearse
router.post('/administradores/login',administradoresController.login)

//Ruta para crear un nuevo administrador
router.post('/administradores',administradoresController.addAdministrador)


//Ruta para cambiar una contraseña
router.post('/administradores/change-password/:id',administradoresController.changePassword)


//Ruta para  eliminar un administrador
router.delete('/administradores/:id',administradoresController.deleteAdministrador)


export default router;