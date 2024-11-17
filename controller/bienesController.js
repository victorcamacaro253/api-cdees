import { query as _query, pool } from '../db/db.js'
import bienesModel from '../models/bienesModel.js'


class bienesController{

static getBienes = async (req, res) => {
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

static getBienesById = async (req, res) => {

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


     static getBienesByDepartamento=  async (req, res) => {
     
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

     static updateBienes = async (req,res)=>{
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

static getBienesActivo =  async (req, res) => {
    
    try {
        const results = await bienesModel.getBienesActivo();
        return  res.status(200).json(results);

    } catch(error){
        console.error('Error ejecutando la consulta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

static cambiarStatusBien= async (req,res)=>{
    const { id } = req.params;
   const {estatus}= req.body;
   console.log(id,estatus)

   try {
    const result= await  bienesModel.cambiarStatusBien(estatus,id);

     return res.json(result);

   } catch (error) {
    console.error('Error ejecutando la consulta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
   }
}


static deleteBien= async  (req,res)=>{
const {id} = req.params;

try {
    const result = await  bienesModel.deleteBien(id);
    if  (result.affectedRows === 0) {
        return res.status(404).json({ error: 'bien no encontrado' });
        }

    res.json(result)



} catch (error) {
    console.error('Error ejecutando la consulta:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
}

}

  static addMultipleBienes= async (req,res)=>{
    const {bienes}= req.body;
    console.log(bienes)

    if (!req.body || typeof req.body !== 'object' || !Array.isArray(req.body.bienes)) {
        return res.status(400).json({ error: 'Bienes must be an array' });
    }

    const errors=[];
    const insertedBienes= [];

    
    try {
       const bienesToInsert=[]

       for(const bien of bienes ){
        const { nombre_bien,
            tipo_bien,
            fecha_adquisicion,
            valor_bien,
            estado_bien,
            responsable,
            ubicacion,
            numero_serie,
            proveedor } = bien

            if (!nombre_bien || !tipo_bien || !fecha_adquisicion || !valor_bien || !numero_serie ) {
                errors.push({ error: 'nombre bien,tipo bien,fecha adquisicion, valor bien y numero de serie son requeridos' });
                continue;
       }

       const existingBien = await bienesModel.existingBien(numero_serie) ;
       if(existingBien){
        errors.push({error:'El bien ya existe  en la base de datos',nombre_bien})
    continue;   
    }
  
    const estatus = 'activo'

 bienesToInsert.push({
    nombre_bien,
    tipo_bien,
    fecha_adquisicion,
    valor_bien,
    estado_bien,
    estatus,
    responsable,
    ubicacion,
    numero_serie,
    proveedor
 })

 const [result] = await bienesModel.addMultipleBienes(bienesToInsert)

 insertedBienes.push({id: result.insertId,nombre_bien})

       
    }

     
 if (errors.length > 0) {
    res.status(400).json({ errors });
} else {
    res.status(201).json({ insertedBienes });
}


    }catch(error){
        console.error('Error ejecutando la consulta:', error);
        res.status(500).json({ error: 'Error interno del servidor ' });
    }
  }


  static deleteMultipleBienes = async  (req,res)=>{
    const {bienes}=req.body;

    if(!Array.isArray(bienes)){
        return res.status(400).json({error:'Tiene que se un array'})
    }


    try {
        const deletePromises = bienes.map(bien=>{
            const { id } = bien;
            return bienesModel.deleteBien(id) 
        })

        await Promise.all(deletePromises)
        
    res.json({message:'Bienes eliminado con exito'})

    } catch (error) {
        res.status(500).json({error:'Error interno en el servidor'},error)

    }

  }

}


export default bienesController