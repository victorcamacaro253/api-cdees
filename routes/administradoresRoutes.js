import { Router } from 'express';
import administradoresController from '../controller/administradoresController.js';


const router = Router();

router.get('/administradores',administradoresController.getAllAdministradores);

router.post('/administradores/login',administradoresController.login)

router.post('/administradores',administradoresController.addAdministrador)

router.post('/administradores/change-password/:id',administradoresController.changePassword)

router.delete('/administradores/:id',administradoresController.deleteAdministrador)


export default router;