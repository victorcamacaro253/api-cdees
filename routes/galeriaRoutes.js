import { Router } from "express";
import galeriaController from "../controller/galeriaController.js";

const router = Router();


router.get('/',galeriaController.getAllGaleria)

router.get('/:id',galeriaController.getGaleriaById)



export default router;