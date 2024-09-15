import { query as _query, pool } from '../db/db.js'
import bienesModel from '../models/bienesModel.js'




const getBienes = async (req, res) => {
    res.header('Access-Control-Allow-Origin','*')
    try {
        const results = await bienesModel.getBienes();

        
        if (results.length === 0) {
            // Si no hay bienes, devolvemos un 404
            return res.status(404).json({ error: 'No se encontraron empleados' });
        }

        res.json(results);

    } catch (err) {
        console.error('Error ejecutando la consulta:', err);
        res.status(500).json({ error: 'Error interno del servidor 1' });
    }
};

const getBienesById = async (req, res) => {

    const {id}= req.params
    res.header('Access-Control-Allow-Origin','*')

    try{
        const result= await  bienesModel.getBienesById(id);

            
        if (result.length === 0) {
            // Si no hay bienes, devolvemos un 404
            return res.status(404).json({ error: 'No se encontraron empleados' });
        }

        res.json(result);

    }catch(error){
        console.error('Error ejecutando la consulta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });

    }
}


     const getBienesByDepartamento=  async (req, res) => {
     
        const { departamento } = req.query;
      console.log(departamento)
        try{
            const result= await   bienesModel.getBienesByDepartamento(departamento);

            if (result.length === 0) {
                // Si no hay bienes, devolvemos un 404
                return res.status(404).json({ error: 'No se encontraron bienes' });
            }

            res.json(result)


        }catch(error){
            console.error('Error ejecutando la consulta:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }

     }

     const updateBienes = async (req,res)=>{
        const {id} = req.params;
        const {nombre_bien, tipo_bien,fecha_adquisicion,valor_bien,estado_bien,responsable,ubicacion,numero_serie,proveedor}= req.body;
     
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'ID de usuario inválido' });
  }

  
  try {

    let updateFields = [];
    let values = [];

    if(nombre_bien){
        updateFields.push('nombre_bien = ?');
        values.push(nombre_bien);
    }

    if(tipo_bien){
        updateFields.push('tipo_bien = ?');
        values.push(tipo_bien);
    }

    if (fecha_adquisicion) {
    
        updateFields.push('fecha_adquisicion = ?');
        values.push(fecha_adquisicion);

     }

   if(valor_bien){
    updateFields.push('valor_bien = ?');
    values.push(valor_bien);
    }

    if (estado_bien) {
        updateFields.push('estado_bien = ?');
        values.push(estado_bien);
    }

    if (responsable) {
        updateFields.push('Responsable = ?');
        values.push(responsable);
    }

    if (ubicacion) {
        updateFields.push('ubicacion = ?');
        values.push(ubicacion);
    }
    if (numero_serie) {
        updateFields.push('numero_serie = ?');
        values.push(numero_serie);
    }

    if (updateFields.length === 0) {
        return res.status(400).json({ error: 'No hay datos para actualizar' });
    }
    if (proveedor) {
        updateFields.push('proveedor = ?');
        values.push(proveedor);
    }

    const results = await bienesModel.updateBienes(id, updateFields,values);

    if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'bien no encontrado' });
    }

    res.status(200).json({ message: 'Bien actualizado exitosamente' });
   

} catch (error) {
    console.error('Error ejecutando la consulta:', error);
    res.status(500).json({ error: 'Error interno del servidor 1' });
}

     }



export default {getBienes,getBienesById,getBienesByDepartamento,updateBienes}