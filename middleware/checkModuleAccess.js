import { query } from "../db/db.js";


const checkModuleAccess = (requiredModules)=>{
    return async (req,res,next)=>{
        const userId=  req.user.id

        const queryl=`SELECT m.nombre_modulo FROM usuario_modulo_permiso mp 
        JOIN modulos m ON mp.id_modulo= m.id_modulo WHERE mp.id_usuario= ? 
        AND  m.nombre_modulo IN (?)`;

        try {
            const results = await query(queryl,[userId,requiredModules])
            if(results.length >0){
                return next()
            }else{
          return res.status(403).json({message:'No tiene permiso ni el modulo adecuado para excder a los recursos'})
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error en la consulta' });
        }
    }
}


export default checkModuleAccess