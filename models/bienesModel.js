import { update } from 'firebase/database';
import { query,pool } from '../db/db.js';

const bienesModel ={


async getBienes(){

    const result = await query('SELECT * FROM bienes INNER JOIN departamentos ON bienes.Responsable=departamentos.id_departamento');
    return result;
},

async getBienesById(id){
    const result = await query('SELECT * FROM bienes WHERE id_bien = ?', [id]);
    return  result;
    
},
 async getBienesByDepartamento(departamento){

    const result= await  query('SELECT * FROM bienes INNER JOIN departamentos ON bienes.Responsable=departamentos.id_departamento WHERE ubicacion = ?', [departamento]);
    return result;


 },
 
 async updateBienes(id, updateFields, values){
    const query1 = `UPDATE bienes SET ${updateFields.join(', ')} WHERE id_bien = ?`;
     // Añadir el ID al final de los valores
     const finalValues = values.concat(id);

      // Ejecutar la consulta
    const results = await query(query1, finalValues);

    return results; // Retornar el resultado de la consulta
    
 }



}
export default bienesModel;
