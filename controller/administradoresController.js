import { query as _query, pool } from '../db/db.js'
import { hash, compare } from 'bcrypt';
import pkg from 'jsonwebtoken';
import {randomBytes} from 'crypto';
const { sign } = pkg;
import administradoresModel from '../models/administradoresModel.js'




const getAllAdministradores = async (req,res) =>{
    res.header('Access-Control-Allow-Origin','*')

    try{
        const results = await administradoresModel.getAllAdministradores();
        res.json(results);

    }catch(error){
        console.error('Error ejecutando la consulta:', error);
        res.status(500).json({ error: 'Error interno del servidor 1' });
    }
}

const login= async (req,res)=>{
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
                            id: user.id,       // El ID del usuario
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

const addAdministrador= async  (req,res) =>{
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

const deleteAdministrador = async (req,res) =>{
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

export default {

    getAllAdministradores,
    login,
    addAdministrador,
    deleteAdministrador
}