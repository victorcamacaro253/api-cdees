import { update } from 'firebase/database';
import { query as _query,pool } from '../db/db.js';
import { updatePassword } from 'firebase/auth';

const administradoresModel={


    async getAllAdministradores(){
        const results = await _query('SELECT * FROM administradores');
        return results;
    },

    async getAdministradorById(id){
        try {
            const [rows] = await pool.query("SELECT * FROM administradores WHERE Id = ?", [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (err) {
            console.error('Error en la búsqueda de usuario:', err);
            throw err; // Lanzar error para ser manejado en el controlador
        }
    },

    async findByUsername(username){

        try {
            const [rows] = await pool.query("SELECT * FROM administradores WHERE Usuario = ?", [username]);
            return rows.length > 0 ? rows[0] : null;
        } catch (err) {
            console.error('Error en la búsqueda de usuario:', err);
            throw err; // Lanzar error para ser manejado en el controlador
        }
    

    },
    
    async existingUsername(username){
        const [result]=  await _query('SELECT Id,Usuario FROM administradores WHERE Usuario=? ',[username])
        return result;
          },

    async addAdministrador(username,email,hashedPassword,estatus,rol){
        const result= await  _query('INSERT INTO administradores (Usuario,Correo_Electronico,Password,estatus,Rol) VALUES (?,?,?,?,?)',
        [username,email,hashedPassword,estatus,rol])
        return result;
    },

    
    async insertLoginRecord(userId, code) {
        await _query(
            'INSERT INTO historial_ingresos (id_administrador, fecha, codigo) VALUES (?, NOW(), ?)',
            [userId, code]
        );
    },

    
    async deleteAdministrador(id) {
        const result = await _query('DELETE FROM administradores WHERE Id = ?', [id]);
        return result.affectedRows;
    },

     async updatePassword(newPassword,id){
        const result ='UPDATE administradores SET Password = ? WHERE Id = ?';
        const values= [newPassword,id];
        const rows = await _query(result,values);
        return rows;
     },

     async getAdmModules(Id){

        const sql = `SELECT 
        
        m.nombre_modulo, 
        GROUP_CONCAT(p.nombre_permiso SEPARATOR ', ') AS permisos
    FROM 
        usuario_modulo_permiso mp
    JOIN 
        modulos m ON mp.id_modulo = m.id_modulo
    JOIN 
        permisos p ON mp.id_permiso = p.id_permiso
    WHERE 
        mp.id_usuario = ?
    GROUP BY 
        m.id_modulo, m.nombre_modulo;;
`
  const result= await _query(sql,[Id]);
  return result;
      
     }

}
 export default administradoresModel;