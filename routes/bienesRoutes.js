import { Router } from 'express';
import bienesController from '../controller/bienesController.js'


const router = Router();


router.get('/bienes',bienesController.getBienes)

export default router


