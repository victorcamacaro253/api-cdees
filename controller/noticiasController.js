import noticiasModel from '../models/noticiasModel.js';
import galeriasModel from '../models/galeriaModel.js';

class noticiasController {


static getNoticias = async (req, res) => {
  try {
    
    const noticias = await noticiasModel.getNoticias();
    if(!noticias){
        return res.status(404).json({message:'Error 404'})
    }


    res.json(noticias)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener noticias' });
    
  }

}
//-----------------------------------------------------------------------------------------------------

static getNoticiaById= async (req, res) => {
    const {id} = req.params;
    try {
       
        const noticias = await noticiasModel.getNoticiaById(id);

        if(!noticias){
            return res.status(404).json({message:'Error 404'})
            }
            res.json(noticias)
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error al obtener noticias' });
                }
                }


//-----------------------------------------------------------------------------------------------------

static createNoticias = async (req, res) => {
  console.log('body', req.body);

  const noticias = [];
  const errors = [];
  const noticiasCreada = [];

  // Extraer los campos directamente de req.body
  const { titulo, resumen, descripcion, categoria } = req.body;

  if (!titulo || !descripcion  || !categoria) {
      return res.status(400).json({ error: 'Falta de datos en la noticia' });
  }

  const imagePath = req.files['imagenPrincipal']?.[0]?.filename || null;

  const noticiaParaInsertar = {
      titulo,
      resumen,
      descripcion,
      categoria,
      
      imagen: imagePath,
  };

  try {
      // Insertar noticia en la base de datos
      const result = await noticiasModel.createNoticias([noticiaParaInsertar]);
      console.log('resultado', result);

      const id_noticia = result.insertId;

      // Manejar las imágenes de la galería
      const galeriaImages = req.files['galeria'] || [];
      const galeriaParaInsertar = galeriaImages.map(image => ({
          id_noticia,
          imagen: image.filename,
      }));

      // Insertar las imágenes de la galería
      if (galeriaParaInsertar.length > 0) {
          await galeriasModel.agregarImagenes(galeriaParaInsertar);
      }

      // Agregar la noticia creada a la respuesta
      noticiasCreada.push({ titulo });

      return res.status(201).json({ message: 'Noticia creada con éxito', noticiasCreada });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error interno del servidor', error });
  }
};


//----------------------------------------------------------------------------------------------------

static createNoticia = async(req,res)=>{
  const {titulo, resumen, descripcion, categoria} = req.body;
  const imagePath = req.files['imagenPrincipal']?.[0]?.filename || null;

const imagen= imagePath;
    try {
      // Insertar noticia en la base de datos
      const result = await noticiasModel.createNoticia(titulo,resumen,descripcion,categoria,imagen);
      console.log('resultado', result);
      const id_noticia= result.insertId;

console.log('id de noticia',id_noticia)
       // Manejar las imágenes de la galería
       const galeriaImages = req.files['galeria'] || [];
       const galeriaParaInsertar = galeriaImages.map(image => ({
           id_noticia,
           imagen: image.filename,
       }));

        // Insertar las imágenes de la galería
      if (galeriaParaInsertar.length > 0) {
        await galeriasModel.agregarImagenes(galeriaParaInsertar);
    }

      // Agregar la noticia creada a la respuesta
const message = `Noticia creada con éxito`
      return res.status(201).json(message );


}catch(error){
  console.error(error);
  return res.status(500).json({message:'Error interno del servidor ',error});
}

}

//----------------------------------------------------------------------------------------------------

static deleteNoticia = async (req, res) => {
  const {id}= req.params

  try {

    const result = await noticiasModel.eliminarNoticia(id);
    console.log('resultado', result);
    if(!result){
      return res.status(404).json({message: 'Noticia no encontrada'})
    }
    
    res.status(200).json({message:'Noticia Eliminada con exito'})
    
  } catch (error) {
    return res.status(500).json({message:'Error interno del servidor'})
    
  }
}

//-----------------------------------------------------------------------------------------------------

static updateNoticia = async (req,res) =>{
  const {id} = req.params
  const {titulo_noticia,resumen,descripcion,categoria} = req.body

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'ID de usuario inválido' });
  }

  const imagePath = req.files[0] ? req.files[0].filename : null; // Solo el nombre del archivo

  try {

    const updateFields = []
    const values= []

    if (titulo){
      updateFields.push('titulo_noticia')
      values.push(titulo_noticia)
    }
    if (resumen){
      updateFields.push('resumen')
      values.push(resumen)
      }
      if (descripcion){
        updateFields.push('descripcion_noticia')
        values.push(descripcion)
        }
        if (categoria){
          updateFields.push('categoria_noticia')
          values.push(categoria)
          }
          if (imagePath){
            updateFields.push('imagen_principal')
            values.push(imagePath)
            }

            if (updateFields.length===0) {
              return res.status(400).json({ error: 'No se ha proporcionado ningun campo'})
            }

           const result = await noticiasModel.updateNoticia(id)

            res.status(200).json({message:'Notica Actualizada con exito'})
    
  } catch (error) {
    console.error('Error ejecutando la consulta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }

}

}
export default noticiasController;