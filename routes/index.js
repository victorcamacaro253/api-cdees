import { Router } from 'express';
import empleadosRoutes from  './EmpleadosRoutes.js';
import administradoresRoutes from  './administradoresRoutes.js';
import bienesRoutes from   './bienesRoutes.js';
import empresaRoutes from   './empresaRoutes.js';
import cargosRoutes from    './cargosRoutes.js';
import noticiasRoutes from './noticiasRoutes.js';
import galeriaRoutes from './galeriaRoutes.js'

const router=  Router();


router.use('/empleados',empleadosRoutes)

router.use('/administradores',administradoresRoutes)

router.use('/bienes',bienesRoutes)

router .use('/empresa',empresaRoutes)

router.use('/cargos',cargosRoutes)

router.use('/noticias',noticiasRoutes)

router.use('/galeria',galeriaRoutes)


export default router







