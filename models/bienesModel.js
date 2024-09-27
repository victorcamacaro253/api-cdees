//import { update } from 'firebase/database';
import { query,pool } from '../db/db.js';

const bienesModel ={


 async getBienesByField(field,value){
 
    const result = await query(`SELECT * FROM bienes INNER JOIN departamentos ON bienes.Responsable=departamentos.id_departamento WHERE ${field} = ?`, [value]);
    return result;

 },

async getBienes(){

    const result = await query('SELECT * FROM bienes INNER JOIN departamentos ON bienes.Responsable=departamentos.id_departamento');
    return result;
},

async getBienesById(id){
    return await this.getBienesByField('id_bien', id);
    
},
 async getBienesByDepartamento(departamento){

     return await this.getBienesByField('ubicacion', departamento);


 }, 

 async updateBienes(id, updateFields, values){
    const query1 = `UPDATE bienes SET ${updateFields.join(', ')} WHERE id_bien = ?`;
     // Añadir el ID al final de los valores
     const finalValues = values.concat(id);

      // Ejecutar la consulta
    const results = await query(query1, finalValues);

    return results; // Retornar el resultado de la consulta
    
 },

 async getBienesActivo(){

  const result = await query('SELECT * FROM bienes WHERE estatus= ?',["activo"]);
  return result;

 },


 async cambiarStatusBien(estatus,id){
    const query1 = `UPDATE bienes SET estatus = ? WHERE id_bien = ?`;
    const finalValues = [estatus,id];
    const results = await query(query1, finalValues);
    return results;
 },
   

 async deleteBien(id){
 
    const result = await  query('DELETE FROM bienes WHERE id_bien = ?', [id]);
    return result;



 },

 async existingBien (numero_serie){
 const [result]= await query( 'SELECT numero_serie from bienes WHERE numero_serie = ?',[numero_serie]);
 return  result;


 },


 async addMultipleBienes(bienes){
   const queries= bienes.map(bien=>{
      const {  nombre_bien,
         tipo_bien,
         fecha_adquisicion,
         valor_bien,
         estado_bien,
         estatus,
         responsable,
         ubicacion,
         numero_serie,
         proveedor}= bien

         return query('INSERT INTO bienes (nombre_bien,tipo_bien,fecha_adquisicion,valor_bien,estado_bien,estatus,responsable,ubicacion,numero_serie,proveedor) VALUES (?,?,?,?,?,?,?,?,?,?)',
         [ nombre_bien,
            tipo_bien,
            fecha_adquisicion,
            valor_bien,
            estado_bien,
            estatus,
            responsable,
            ubicacion,
            numero_serie,
            proveedor])
   })

   const results = await Promise.all(queries);
   return results;
 }

}
export default bienesModel;
