import { query } from "../db/db.js";

class noticiasModel {

static getNoticias= async ()=>{
 const sql= `SELECT * FROM noticias`;
 const result = await query(sql);
 return result;
}

//-----------------------------------------------------------------------------------------------------------------

static getNoticiaById= async (id)=>{
 const sql= `SELECT * FROM noticias WHERE id_noticia = ?`;
 const result = await query(sql, id);
 return result;
}

//-----------------------------------------------------------------------------------------------------------------------

static createNoticias= async (noticias)=>{
    const queries = noticias.map(noticia=>{
        const {titulo,resumen,descripcion,categoria,imagen}= noticia;

        return query(`INSERT INTO noticias (titulo_noticia,resumen,descripcion_noticia,categoria_noticia,imagen_principal,fecha_noticia)
                     VALUES (?,?,?,?,?,NOW())
             `,[titulo,resumen,descripcion,categoria,imagen])
    })

    const result = await Promise.all(queries);
    return result;

}


//-------------------------------------------------------------------------------------------------------------------------------------------


 static createNoticia= async (titulo,resumen,descripcion,categoria,imagen)=>{

    const sql = `INSERT INTO noticias (titulo_noticia,resumen,descripcion_noticia,categoria_noticia,imagen_principal,fecha_noticia) VALUES (?,?,?,?,?,NOW())`
    const result = await query(sql,[titulo,resumen,descripcion,categoria,imagen])
    return result;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------

static eliminarNoticia= async (id)=>{

    const sql = `DELETE FROM noticias WHERE id_noticia=?`
    const result = await query(sql,[id])
    return result;
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------


   static  updateNoticia= async (id, updateFields, values)=>{

        //construir la parte de SET para la consulta , añadiendo un signo de interrogacion para cada campo
        const setClause= updateFields.map(field => `${field} = ? `).join(', '); 
   
       // Construir la consulta SQL
       const query = `UPDATE noticias SET ${setClause} WHERE id_noticia = ?`;
   
       // Añadir el ID al final de los valores
       const finalValues = values.concat(id);
   
       // Ejecutar la consulta
       const results = await query(query, finalValues);
   
       return results; // Retornar el resultado de la consulta
   }


}
export default noticiasModel;