import { query as _query, pool } from '../db/db.js'
import empleadosModel from '../models/EmpleadosModel.js';



const getAllEmpleados = async (req, res) => {
    res.header('Access-Control-Allow-Origin','*')
    try {
        const results = await empleadosModel.getAllEmpleados();

          
        if (results.length === 0) {
            // Si no hay empleados, devolvemos un 404
            return res.status(404).json({ error: 'No se encontraron empleados' });
        }

        res.json(results);

    } catch (err) {
        console.error('Error ejecutando la consulta:', err);
        res.status(500).json({ error: 'Error interno del servidor 1' });
    }
};

const getEmpleadoById = async (req,res) =>{
    const { id } = req.params

    try{
        const results = await empleadosModel.getEmpleadoById(id);


    // Verificamos si no se encontró ningún empleado
    if (!results || results.length === 0) {
        return res.status(404).json({ error: 'Empleado no encontrado' });
    }

        res.json(results);

    }catch(error){
        console.error('Error ejecutando la consulta:', error);
        res.status(500).json({ error: 'Error interno del servidor 1' });
    }
}

const getEmpleadosActivos = async  (req,res) =>{

    try {
        const result = await empleadosModel.getEmpleadosActivos();
        res.json(result)
        
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        res.status(500).json({ error: 'Error interno del servidor 1' });
    }
}

const getEmpleadoByName= async (req,res)=>{
const {nombre}= req.query;
console.log(nombre)
try{
    const result = await empleadosModel.getEmpleadoByName(nombre);
   // Verificamos si no se encontró ningún empleado
   if (result.length === 0) {
    return res.status(404).json({ error: 'Empleado no encontrado' });
}

    res.json(result)

}catch(error){
    console.error('Error ejecutando la consulta:', error);
    res.status(500).json({ error: 'Error interno del servidor 1' });
}
}

  
const checkUserExists = async (req, res, next) => {
    const { cedula } = req.body;
  
    try {
      const existingUser = await empleadosModel.existingCedula(cedula);
      if (existingUser) {
        return res.status(400).json({ error: 'El usario uya existe' });
      }
      next();
    } catch (err) {
      console.error('Error al verificar la existencia del usuario:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };
  

 const addEmpleado = async (req,res) =>{
    
    const { Primer_nombre,Segundo_nombre,Primer_apellido,Segundo_apellido, cedula,genero,email ,direccion,id_estado,id_municipio,id_parroquia,id_ciudad,telefono,id_cargo,fecha_ingreso,fecha_salida,estatus,imagen } = req.body;
   
    if (!Primer_nombre || !Segundo_nombre || !Primer_apellido || !Segundo_apellido) {
        return res.status(400).json({ error: 'Todos los campos  son requeridos' });
    }
/*
    if (password.length < 7) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 7 caracteres' });
    }
*/
    try{
      //  const hashedPassword = await hash(password, 10);
    const newUser = await empleadosModel.addEmpleado(Primer_nombre,Segundo_nombre,Primer_apellido,Segundo_apellido, cedula,genero,email ,direccion,id_estado,id_municipio,id_parroquia,id_ciudad,telefono,id_cargo,fecha_ingreso,fecha_salida,estatus,imagen );

    res.status(201).json({ id: newUser.id, Primer_nombre, email });

    }catch(error){
        console.error('Error al agregar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor', message: error.message });
    }


  }


const updateEmpleado= async (req,res) =>{
    const {id} = req.params;
    const {Primer_nombre,Segundo_nombre,Primer_apellido,Segundo_apellido,cedula,direccion }= req.body

    
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'ID de usuario inválido' });
  }

  /*  if (!Primer_nombre || !Segundo_nombre || !Primer_apellido || !Segundo_apellido || !cedula || !direccion  ) {
        return res.status(400).json({ error: 'No hay datos para actualizar' });
    } */


    try {

        let updateFields = [];
        let values = [];

        if(Primer_nombre){
            updateFields.push('Primer_nombre = ?');
            values.push(Primer_nombre);
        }

        if(Segundo_nombre){
            updateFields.push('Segundo_nombre = ?');
            values.push(Segundo_nombre);
        }

        if (Primer_apellido) {
        
            updateFields.push('Primer_apellido = ?');
            values.push(Primer_apellido);

         }

       if(Segundo_apellido){
        updateFields.push('Segundo_apellido = ?');
        values.push(Segundo_apellido);
        }

        if (cedula) {
            updateFields.push('cedula = ?');
            values.push(cedula);
        }

        if (direccion) {
            updateFields.push('direccion = ?');
            values.push(direccion);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ error: 'No hay datos para actualizar' });
        }

        const results = await empleadosModel.updateEmpleado(id, updateFields,values);

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json({ message: 'Usuario actualizado exitosamente' });
       

    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        res.status(500).json({ error: 'Error interno del servidor 1' });
    }
}


const deleteEmpleado = async (req,res)=>{
const { id } = req.params

try {
    const result= await empleadosModel.deleteEmpleado(id);

            // Validar si los resultados están vacíos
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
    
            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    
 
} catch (error) {

    console.error('Error ejecutando la consulta:', error);
        res.status(500).json({ error: 'Error interno del servidor 1' });
    
}

}


 const getEmpleadosByDepartamentos= async  (req,res)=>{
const { id} = req.params;


try{
    const result =  await empleadosModel.getEmpleadosByDepartamentos();

    if (!result) {
        return res.status(404).json({ error: 'departamento no encontrado' });
    }

    res.json(result);

}catch(error){
    console.error('Error ejecutando la consulta:', error);
    res.status(500).json({ error: 'Error interno del servidor 1' });
}

 }


 const getEmpleadosByDepartamento = async(req,res)=>{
 
    const {departamento}= req.query;
console.log(departamento)
    try {

        const result = await empleadosModel.getEmpleadosByDepartamento(departamento);


        res.json(result)
        
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        res.status(500).json({ error: 'Error interno del servidor ' });
    }


 }


 const statusEmpleado = async (req,res)=>{
    const {id}=req.params
    const {status}= req.query

    try {
        
        const result= await empleadosModel.statusEmpleado(id,status);
        
        if (!result) {
              return res.status(404).json({ error: 'empleado no encontrado' });
        }
        const empleado= await empleadosModel.getEmpleadoById(id);

        
        res.json(empleado);

    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        res.status(500).json({ error: 'Error interno del servidor ' });
    }
 }

 const getEmpleadosByFechaIngreso= async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.query;
      console.log(fechaInicio,fechaFin)
      


      
        // Llamar al modelo para obtener los empleados
        const empleados = await empleadosModel.getEmpleadosByFechaIngreso(fechaInicio, fechaFin);

        res.status(200).json(empleados);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener empleados por fecha de ingreso" });
    }
}

const addMultipleEmpleados= async (req,res)=>{
    const {empleados} = req.body;
    const imagePath = req.files && req.files.length > 0 ? `/uploads/${req.files[0].filename}` : null;

    console.log(empleados)

    if (!req.body || typeof req.body !== 'object' || !Array.isArray(req.body.empleados)) {
        return res.status(400).json({ error: 'Products must be an array' });
    }

    const errors= [];
    const createdEmpleados=[]


    try{
    const empleadosToInsert= []

    for(const empleado of empleados){
        const  {
            Primer_nombre,
            Segundo_nombre,
            Primer_apellido,
            Segundo_apellido,
             cedula,
             genero,
             email,
             direccion,
             id_estado,
             id_municipio,
             id_parroquia,
             id_ciudad,
             telefono,
             id_cargo,
             fecha_ingreso,
             fecha_salida,
             
             imagePath
        } = empleado

        if (!Primer_nombre || !Primer_apellido || !cedula || !email || !direccion || !id_cargo) {
            errors.push({ error: 'Primer_nombre,Primer_apellido , cedula, email,direccion y id_cargo son requeridos' });
            continue;
        }

       // Verificar si el empleado ya existe
       const existingCedula = await empleadosModel.existingCedula(cedula);
       if (existingCedula) {
           errors.push({ error: 'El empleado ya existe',Primer_nombre });
           continue;
       }

     const estatus='activo'    
   
       empleadosToInsert.push({
        Primer_nombre,
        Segundo_nombre,
        Primer_apellido,
        Segundo_apellido,
         cedula,
         genero,
         email,
         direccion,
         id_estado,
         id_municipio,
         id_parroquia,
         id_ciudad,
         telefono,
         id_cargo,
         fecha_ingreso,
         fecha_salida,
         estatus,
         imagePath
       })

  
            // Llamar a la función de inserción de múltiples productos en el modelo
            const [result] = await empleadosModel.addMultipleUsers(empleadosToInsert);

            createdEmpleados.push({ id: result.insertId, Primer_nombre });

    }
    
    if (errors.length > 0) {
        res.status(400).json({ errors });
    } else {
        res.status(201).json({ createdEmpleados });
    }

    }catch(error){
        console.error('Error ejecutando la consulta:', error);
        res.status(500).json({ error: 'Error interno del servidor ' });
    }

}

const deleteMultipleEmpleados= async (req,res)=>{
   const {empleados} = req.body;

   if(!Array.isArray(empleados)){
    return res.status(400).json({ error: 'La lista de empleados debe ser un array'})
   }

   try {
    const deletePromises = empleados.map(empleado=>{
        const {id}= empleado;
        return  empleadosModel.deleteEmpleado(id);
    })

    await Promise.all(deletePromises)

    res.json({message:'Empleados eliminando  con éxito'})

   } catch (error) {
    res.status(500).json({error:'Error interno en el servidor'},error)
   }
}

const updateMultipleEmpleados = async (req,res)=>{
    const {empleados} = req.body;
    const imagePath = req.files && req.files.length > 0 ? `/uploads/${req.files[0].filename}` : null;



    if (!req.body || typeof req.body !== 'object' || !Array.isArray(req.body.empleados)) {
        return res.status(400).json({ error: 'Empleados must be an array' });
    }


    const errors = [];
    const updatedEmpleados = [];
    
    try{
   
        const empleadosToUpdate= [];

        for(const  empleado of empleados){
            const {
                id_empleado,
                Primer_nombre,
                Segundo_nombre,
                Primer_apellido,
                Segundo_apellido,
                cedula,
                genero,
                email,
                direccion,
                id_estado,
                id_municipio,
                id_parroquia,
                id_ciudad,
                telefono,
                id_cargo,
                fecha_ingreso,
                fecha_salida,
                
                imagePath
            } = empleado;

            if (!id_empleado || !Primer_nombre || !Primer_apellido || !cedula || !email || !direccion || !id_cargo) {
                errors.push({ error: 'id_empleado, Primer_nombre, Primer_apellido, cedula, email, direccion y id_cargo son requeridos', empleado });
                continue;
            }

         // Verificar si el empleado ya existe
       const existingEmpleado = await empleadosModel.getEmpleadoById(id_empleado);
       if (!existingEmpleado) {
           errors.push({ error: 'El empleado no existe',Primer_nombre });
           continue;
       }
       const estatus= 'activo';

  // Crear objeto para actualizar el empleado
  empleadosToUpdate.push({
    id_empleado,
    Primer_nombre,
    Segundo_nombre,
    Primer_apellido,
    Segundo_apellido,
    cedula,
    genero,
    email,
    direccion,
    id_estado,
    id_municipio,
    id_parroquia,
    id_ciudad,
    telefono,
    id_cargo,
    fecha_ingreso,
    fecha_salida,
    estatus,
    imagePath
});


   
if (empleadosToUpdate.length > 0) {
    // Llamar a la función de actualización múltiple en el modelo
    const results = await empleadosModel.updateMultipleEmpleados(empleadosToUpdate);
    updatedEmpleados.push({ id: results.insertId, Primer_nombre });

   
}

        }

           
    if (errors.length > 0) {
        res.status(400).json({ errors });
    } else {
        res.status(201).json({ updatedEmpleados });
    }


    }catch(error){
        console.error('Error actualizando empleados:', error);
        res.status(500).json({ error: 'Error interno del servidor' });

    }

}


export default {
    getAllEmpleados,
    getEmpleadoById,
    getEmpleadosActivos,
    updateEmpleado,
    deleteEmpleado,
    addEmpleado,
    checkUserExists,
    getEmpleadoByName,
    getEmpleadosByDepartamentos,
    getEmpleadosByDepartamento,
    statusEmpleado,
    getEmpleadosByFechaIngreso,
    addMultipleEmpleados,
    deleteMultipleEmpleados,
    updateMultipleEmpleados



}