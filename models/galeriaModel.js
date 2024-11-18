import { query } from "../db/db.js";


class galeriaModel {


    static async getAllGaleria() {
        const sql= `SELECT * FROM galeria g JOIN noticias n ON g.id_noticia= n.id_noticia `
        const result= await query(sql);
        return result

    }

    static async getGaleriaById(id) {
        const sql= `SELECT g.imagen FROM galeria g JOIN noticias n ON g.id_noticia=n.id_noticia WHERE g.id_noticia=? `
        const result= await query(sql,[id])
        return result
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