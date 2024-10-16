import { query as _query, pool } from '../db/db.js'
import { hash, compare } from 'bcrypt';
import pkg from 'jsonwebtoken';
import {randomBytes} from 'crypto';
const { sign } = pkg;
import administradoresModel from '../models/administradoresModel.js'


class  administradoresController {


static getAllAdministradores = async (req,res) =>{
    res.header('Access-Control-Allow-Origin','*')

    try{
        const results = await administradoresModel.getAllAdministradores();
        res.json(results);

    }catch(error){
        console.error('Error ejecutando la consulta:', error);
        res.status(500).json({ error: 'Error interno del servidor 1' });
    }
}

static login= async (req,res)=>{
    const { username, password } = req.body;

    // Configurar encabezados CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  
    // Manejar solicitudes OPTIONS para preflight
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

        // Validación de entrada
        if (!username || !password) {
            return res.status(400).json({ error: 'nombre y contraseña son requeridos' });
        }

     try{

        const results = await administradoresModel.findByUsername(username)
        const user = results; // Asegúrate de que results sea un array y toma el primer elemento
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

                // Comparar la contraseña ingresada con la almacenada en la base de datos
                const match = await compare(password, user.Password);
                
                console.log(match)
       
                if (match) {
                    // Generar un token JWT tras la autenticación exitosa
                    const token = sign(
                        {
                            id: user.Id,       // El ID del usuario
                            username: user.Usuario,
                            role: user.Rol
                        },
                        process.env.JWT_SECRET,          // Clave secreta para firmar el token
                        { expiresIn: '1h' }  // Expira en 1 hora
                    );

                    // Generar un código aleatorio
        const randomCode = randomBytes(8).toString('hex'); // Genera un código aleatorio de 8 caracteres

        // Insertar registro de inicio de sesión en la base de datos
        administradoresModel.insertLoginRecord( user.Id, randomCode)
        
                    // Enviar el token y datos del usuario en la respuesta
                    return res.status(200).json({
                        message: 'Autenticación exitosa',
                        token,  // El token JWT
                        user: {
                            id:user.Id,
                            username: user.Usuario,
                            role: user.Rol
                        }
                    });
                } else {
                    return res.status(401).json({ message: 'Contraseña incorrecta' });
                }
        

     }catch(error){
        console.error('Error ejecutando la consulta:', error);
        res.status(500).json({ error: 'Error interno del servidor 1' });
     }

}


static addAdministrador= async  (req,res) =>{
  const {username,email,password,estatus,rol} = req.body
  console.log(username)
  if (!username || !email || !password || !estatus || !rol) {
    return res.status(400).json({ error: 'todos los campos son requeridos' });
}
   try{
    
       // Check if the user already exists by cedula
       const existingUser = await administradoresModel.existingUsername(username);
       if (existingUser) {
           return res.status(400).json({ error: 'Usuario ya existe' });
       }

       // Hash the password
       const hashedPassword = await hash(password, 10);

     const result = await administradoresModel.addAdministrador(username,email,hashedPassword,estatus,rol)

     res.status(201).json({ id: result.id,username, email });

   }catch(error){
    console.error('Error ejecutando la consulta:', error);
    res.status(500).json({ error: 'Error interno del servidor 1' });
   }

}


static deleteAdministrador = async (req,res) =>{
 const {id} = req.params;

 try {

    const result = await administradoresModel.deleteAdministrador(id);
    
    if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    
 } catch (error) {
    console.error('Error ejecutando la consulta:', error);
    res.status(500).json({ error: 'Error interno del servidor ' });
 }
}



static  changePassword = async (req,res) =>{
    const {id} = req.params;
   const {oldPassword,newPassword}= req.body

    //validar que los campos no esten vacios
    if ( !oldPassword || !newPassword) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });

    }

    try {
        const result = await administradoresModel.getAdministradorById(id);
        const user=result;

        if (!user) {
            return res.status(404).json({error:'usuario no encontrado'})
            
        }


        const match = await compare(oldPassword, user.Password);
        
        if(!match){
            return res.status(404).json({error:'contraseña actual incorrecta'})
        }

        const hashedNewPassword = await hash(newPassword,10)

        await administradoresModel.updatePassword(id,hashedNewPassword)

        return res.status(200).json({message:'Contraseña actualizada con exito'})

    } catch (error) {
        console.error('Error interno del servidor :', error);
        return res.status(500).json({error:'Error del servidor'})

    }

}


//--------------------------------------------------------------------------------

static getAdmModules= async (req,res)=>{
    const {id} = req.params;

   
  if (isNaN(id) || id <= 0) {
    return res.status(HTTP_NOT_FOUND).json({ error: 'Usuario no encontrado' });
  }


    try {

        const result = await  administradoresModel.getAdmModules(id);

        const user=result;

        if (!user) {
         return res.status(404).json({error:'Usuario no encontrado'})

        }
       return  res.status(200).json(user)

        
    } catch (error) {
        console.error('Error interno del servidor :', error);
        return res.status(500).json({error:'Error del servidor'})
    }


}


static addModulosPermisos= async (req,res)=>{
const {id_adm,modulos} = req.body

if(!id_adm  || !modulos || modulos.lenght === 0 ){

    return res.status(400).json({message:'Datos incompletos'})
}

try{

for(const modulo of modulos){
    const {id_modulo,permisos}= modulo;

    if (!id_modulo || !permisos || permisos.length === 0) {
        continue; // Saltar si faltan datos
    }

    for (const id_permiso of permisos){
        
     await  administradoresModel.addModulosPermisos(id_adm,id_modulo,id_permiso)

    }
}

return res.status(200).json( {message:'Modulos y permisos asignados correctamente'})


}catch(error){
 console.error('Error interno del servidor :', error);
 return  res.status(500).json({error:'Error al asignar  modulos y permisos'})


}

}


static deleteModulosPermisos= async (req,res)=>{
    const { id_adm,modulos }= req.body

    
        if(!id_adm || !modulos  || modulos.length === 0){
     return res.status(400).json({ message: 'Datos incompletos' });
        }

        try{

            for(const modulo of modulos){
                const {id_modulo,permisos}= modulo
            
                if(!id_modulo ||  !permisos || permisos.length === 0){
             

                    const result = await administradoresModel.deleteAdmModulo(id_adm,id_modulo)

                }else{
                    const result = await administradoresModel.deleteModulosPermisos(id_adm,id_modulo,permisos)
                }
            
            }

            return res.json({message:'Permisos Eliminados correctamente'})


    }catch(error){
        console.error('Error interno del servidor :', error);
        return res.status(500).json({error:'Error al eliminar modulos y permisos'})
    }
}

}

export default administradoresController