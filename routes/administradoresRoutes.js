import { Router } from 'express';
import administradoresController from '../controller/administradoresController.js';


const router = Router();


//Ruta para obtener los datos de los  administradores

router.get('/adm',administradoresController.getAllAdministradores);



router.get('/adm')

//Ruta para logearse
router.post('/adm/login',administradoresController.login)

//Ruta para crear un nuevo administrador
router.post('/adm',administradoresController.addAdministrador)


//Ruta para cambiar una contraseña
router.post('/adm/change-password/:id',administradoresController.changePassword)


//Ruta para  eliminar un administrador
router.delete('/adm/:id',administradoresController.deleteAdministrador)

//--------------------------------------------------------------------------------

router.get('/adminAuth/:id/modulos',administradoresController.getAdmModules)

//router.post('/admAuth',administradoresController.addModulosPermisos)

export default router;