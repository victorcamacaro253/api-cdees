import {query} from '../db/db.js'


const empresaModel = {

 async getCompanyInfo(){
    const sql= 'SELECT empresa.id, empresa.Nombre, empresa.Direccion, empresa.Telefono, empresa.Rif, CONCAT(empleados.Primer_nombre, " ", empleados.Primer_apellido) AS Presidente FROM empresa JOIN empleados ON empresa.Presidente = empleados.id_empleado ';
      const result= await query(sql);
      return result
 },

 async getCompanyById(id){
    const sql= 'SELECT empresa.id, empresa.Nombre, empresa.Direccion, empresa.Telefono, empresa.Rif, CONCAT(empleados.Primer_nombre, " ", empleados.Primer_apellido) AS Presidente FROM empresa JOIN empleados ON empresa.Presidente = empleados.id_empleado WHERE id=? ';
      const result= await query(sql,[id]);
      return result
 },


 async  addEmpresa(empresas) {
    try {
      const queries = empresas.map((empresa) => {
        const { nombre, direccion, telefono, rif } = empresa;
  
        // Validación de datos
        if (!nombre || !direccion || !telefono || !rif) {
          throw new Error('Faltan datos para insertar');
        }
  
        const sql = 'INSERT INTO empresa (Nombre, Direccion, Telefono, Rif) VALUES (?, ?, ?, ?)';
        return query(sql, [nombre, direccion, telefono, rif]);
      });
  
      const result = await Promise.all(queries);
      return result;
    } catch (error) {
      console.error('Error al insertar empresas:', error);
      throw error;
    }
  },

  async deleteCompany(id){
    const sql = 'DELETE FROM empresa WHERE id=? ';
    const result = await query(sql,[id])
    return result
  }


}

export default empresaModel;