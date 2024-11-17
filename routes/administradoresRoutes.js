import { Router } from 'express';
import administradoresController from '../controller/administradoresController.js';


const router = Router();


//Ruta para obtener los datos de los  administradores

router.get('/',administradoresController.getAllAdministradores);



//Ruta para logearse
router.post('/login',administradoresController.login)

//Ruta para crear un nuevo administrador
router.post('/',administradoresController.addAdministrador)


//Ruta para cambiar una contraseña
router.post('/change-password/:id',administradoresController.changePassword)


//Ruta para  eliminar un administrador
router.delete('/:id',administradoresController.deleteAdministrador)

//--------------------------------------------------------------------------------

router.get('/adminAuth/:id/modulos',administradoresController.getAdmModules)

router.post('/adminAuth',administradoresController.addModulosPermisos)

router.post('/adminAuth/remove',administradoresController.deleteModulosPermisos)

export default router;