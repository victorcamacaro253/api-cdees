import { query } from 'express';
import { query as _query,pool } from '../db/db.js';

const empleadosModel = {

    async getAllEmpleados(){
        const result = await _query('SELECT id_empleado,Primer_nombre,Primer_apellido,cedula,Correo_electronico,telefono,Cargo,estatus,imagen FROM empleados INNER JOIN cargos ON empleados.Id_cargo=cargos.Id_cargo ')
        return result;
    },

    


    async getEmpleadoById(id){
        const result = await _query('SELECT id_empleado,Primer_nombre,Primer_apellido,cedula,Correo_electronico,telefono,Cargo,estatus,imagen FROM empleados INNER JOIN cargos ON empleados.Id_cargo=cargos.Id_cargo WHERE id_empleado= ?',[id]);
        return result;
    },

    async getEmpleadosActivos(){
       const activo= 'activo';
        const result = await _query('SELECT id_empleado,Primer_nombre,Primer_apellido,cedula,Correo_electronico,telefono,Cargo,estatus,imagen FROM empleados INNER JOIN cargos ON empleados.Id_cargo=cargos.Id_cargo WHERE estatus = ?',[activo]);
        return result;
    },

    async existingCedula(cedula) {
        const results = await _query('SELECT cedula  FROM empleados WHERE cedula = ?',[cedula]);
        return results.length > 0;
    },

    async addEmpleado( Primer_nombre,Segundo_nombre,Primer_apellido,Segundo_apellido, cedula,genero,email ,direccion,id_estado,id_municipio,id_parroquia,id_ciudad,telefono,id_cargo,fecha_ingreso,fecha_salida,estatus,imagen){
 const result = await _query("INSERT INTO `empleados`( `Primer_nombre`, `Segundo_Nombre`, `Primer_apellido`, `Segundo_apellido`, `cedula`, `Genero`, `Correo_electronico`, `direccion`, `id_estado`, `id_municipio`, `id_parroquia`, `id_ciudad`, `telefono`,`Id_cargo`, `fecha-ingreso`,`fecha-salida`, `estatus`, `imagen`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
 [ Primer_nombre,Segundo_nombre,Primer_apellido,Segundo_apellido, cedula,genero,email ,direccion,id_estado,id_municipio,id_parroquia,id_ciudad,telefono,id_cargo,fecha_ingreso,fecha_salida,estatus,imagen])

  return result;
    },

    async updateEmpleado(id, updateFields, values){

        const query = `UPDATE empleados SET ${updateFields.join(', ')} WHERE id_empleado = ?`;
        // Añadir el ID al final de los valores
    const finalValues = values.concat(id);

    // Ejecutar la consulta
    const results = await _query(query, finalValues);

    return results; // Retornar el resultado de la consulta
    },

    async deleteEmpleado(id){
        const result= await _query('DELETE FROM empleados WHERE id_empleado=?',[id]);
        return result.affectedRows;
    },

    async getEmpleadoByName(nombre){
        const result= await _query('SELECT id_empleado,Primer_nombre,Primer_apellido,cedula,Correo_electronico,telefono,Cargo,estatus,imagen FROM empleados INNER JOIN cargos ON empleados.Id_cargo=cargos.Id_cargo WHERE Primer_nombre= ? ',
        [nombre])
        return  result;

    },

    async getEmpleadosByDepartamentos(){
        const result=  await _query('SELECT d.Departamento, COUNT(e.id_empleado) AS total_empleados FROM departamentos d LEFT JOIN empleados e ON d.id_departamento = e.id_departamento GROUP BY d.id_departamento ')
        return result;
    },
    
    async getEmpleadosByDepartamento(){
        const result=  await _query('SELECT d.Departamento, COUNT(e.id_empleado) AS total_empleados FROM departamentos d LEFT JOIN empleados e ON d.id_departamento = e.id_departamento  WHERE d.Departamento = "Presidencia"   GROUP BY d.id_departamento');
        return result;
    },
    async statusEmpleado(id,status){
        const result= await _query('UPDATE empleados SET estatus=? WHERE id_empleado=?',[status,id]);
        return result;
    },
    async getEmpleadosByFechaIngreso(fechaInicio, fechaFin) {
        let query = `SELECT * FROM empleados WHERE 1=1   `; // Base de la consulta
        const params = [];

           // Si se proporciona fechaInicio, filtrar desde esa fecha en adelante
           if (fechaInicio) {
            query += " AND `fecha-ingreso` >= ?";
            params.push(fechaInicio);
        }

        // Si se proporciona fechaFin, filtrar hasta esa fecha
        if (fechaFin) {
            query += " AND `fecha-ingreso` <= ?";
            params.push(fechaFin);
        }


        // Ejecutar la consulta y devolver los resultados
        const [rows] = await pool.query(query, params);
        return rows;
    },

    async addMultipleUsers(empleados){

        const queries = empleados.map(empleado=>{
            const { Primer_nombre,
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
                 imagePath } = empleado

          return _query('INSERT INTO `empleados`( `Primer_nombre`, `Segundo_Nombre`, `Primer_apellido`, `Segundo_apellido`, `cedula`, `Genero`, `Correo_electronico`, `direccion`, `id_estado`, `id_municipio`, `id_parroquia`, `id_ciudad`, `telefono`,`Id_cargo`, `fecha-ingreso`,`fecha-salida`, `estatus`, `imagen`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[ Primer_nombre,Segundo_nombre,Primer_apellido,Segundo_apellido, cedula,genero,email ,direccion,id_estado,id_municipio,id_parroquia,id_ciudad,telefono,id_cargo,fecha_ingreso,fecha_salida,estatus,imagePath])


        })

        const result = await Promise.all(queries);
        return result;
    },

    async updateMultipleEmpleados(empleados){
        const queries = empleados.map(empleado=>{
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
                estatus,
                imagePath
            } = empleado


            return _query('UPDATE empleados SET Primer_nombre= ? ,  Segundo_Nombre = ?, Primer_apellido = ?, Segundo_apellido = ?, cedula = ?, Genero = ?, Correo_electronico = ?, direccion = ?, id_estado = ?, id_municipio = ?, id_parroquia = ?, id_ciudad = ?, telefono = ?, Id_cargo = ?, `fecha-ingreso` = ?, `fecha-salida` = ?, estatus = ?, imagen = ? WHERE id_empleado = ?',
            [            Primer_nombre,
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
                imagePath,
                id_empleado
    ])

        })

        const result= await Promise.all(queries);
        return result;
    }
}

export default empleadosModel