import { query as _query,pool } from '../db/db.js';

const administradoresModel={


    async getAllAdministradores(){
        const results = await _query('SELECT * FROM administradores');
        return results;
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


}
 export default administradoresModel;