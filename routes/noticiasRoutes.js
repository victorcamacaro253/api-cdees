import { Router } from "express";
import noticiasController from "../controller/noticiasController.js";
import upload from '../middleware/multerConfig.js';


const router= Router();

router.get('/',noticiasController.getNoticias)

router.get('/:id',noticiasController.getNoticiaById)


// Ruta para crear una noticia
router.post('/v1/', upload.fields([
    { name: 'imagenPrincipal', maxCount: 1 }, // Solo una imagen principal
    { name: 'galeria', maxCount: 5 } // Hasta 5 imágenes en la galería
]), noticiasController.createNoticias);

router.post('/v2/', upload.fields([
    { name: 'imagenPrincipal', maxCount: 1 }, // Solo una imagen principal
    { name: 'galeria', maxCount: 5 } // Hasta 5 imágenes en la galería
]), noticiasController.createNoticia);

//router.post('/',upload.array('image'),noticiasController.createNoticia)

router.delete('/:id',noticiasController.deleteNoticia)

router.put('/:id',upload.single('image'),noticiasController.updateNoticia)

export default router;