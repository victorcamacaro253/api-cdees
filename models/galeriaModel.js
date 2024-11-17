import { query } from "../db/db.js";


class galeriaModel {
    static async getAllGaleria() {

    }

    static async getGaleriaById(id) {
    }

    static agregarImagenes= async (noticias)=>{
        const queries = noticias.map(noticia=>{
            const {id_noticia,imagen}= noticia;
    
            return query(`INSERT INTO galeria (id_noticia,imagen,fecha_imagen)
                         VALUES (?,?,NOW())
                 `,[id_noticia,imagen])
        })
    
        const result = await Promise.all(queries);
        return result;
    
    }
       

}

export default galeriaModel;