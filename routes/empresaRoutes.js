import { Router } from 'express';
import empresaController from '../controller/empresaController.js';

const router= Router()


router.get('/empresa',empresaController.getCompanyInfo)

router.post('/empresa',empresaController.addEmpresa)

//router.update('/empresa',empresaController.updateCompany)

router.delete('/empresa/:id',empresaController.deleteCompany)


export default router