import { query } from "../db/db.js";




class cargosModel  {

static async getCargos(){
    const result = await query("SELECT Cargo,Tipo,Departamento,encargado encargado_departamento FROM cargos JOIN departamentos ON  cargos.id_departamento = departamentos.id_departamento");

    return result;

}

static  async getCargoById(id){

    const sql=  `SELECT Cargo,Tipo,Departamento,encargado encargado_departamento FROM cargos JOIN departamentos ON  cargos.id_departamento = departamentos.id_departamento WHERE Id_cargo = ?`
    const result = await query(sql,[id]);
    return result;

}

static async  createCargo(cargo,tipo){
    const sql = `INSERT INTO cargos (Cargo,tipo) values  (?,?)`

    const result = await query(sql,[cargo,tipo]);
    return result;


}

 static async checkCargoExist(cargo){
    const sql=  `SELECT Cargo,Tipo,Departamento,encargado encargado_departamento FROM cargos JOIN departamentos ON  cargos.id_departamento = departamentos.id_departamento WHERE Cargo= ?`
    const result= query(sql,[cargo])
    return result;
}

 static async  updateCargo(id,updateFields,values){
    
    //construir la parte de SET para la consulta , añadiendo un signo de interrogacion para cada campo
const setClause= updateFields.map(field=>`${field}= ?`).join(',');  

 // construimos las consultas   
const sql=`UPDATE cargos SET ${setClause} WHERE id_cargo = ? `

//Añadimos el ID al final de los valores
const finalValues= values.concat(id);

//Ejecutar la consulta
const results= await query(sql,finalValues)

return results



}



static async  deleteCargo(id){
    const sql = `DELETE FROM cargos WHERE id_cargo = ?`
    const result = await query(sql,[id]);
    return result;
}


static async addMultipleCargos(cargos){
    const queries = cargos.map(cargol=>{
        const {cargo,tipo,id_departamento}= cargol

        return query('INSERT INTO cargos (Cargo,Tipo,id_departamento) VALUES(?,?,?)',[cargo,tipo,id_departamento])
    })


    const result=  await Promise.all(queries)
    return result;
    }   

    static async getCargosByType (type){
        const sql = `SELECT Cargo,Tipo,Departamento,Encargado FROM cargos JOIN departamentos ON  cargos.id_departamento = departamentos.id_departamento
        WHERE Tipo = ?`
        const result = await query(sql,[type])
        return result;
        }


       static async getNumerodeCargosporTipo (){
        const sql= `SELECT Tipo,COUNT(Cargo) as Numero FROM cargos GROUP BY Tipo`;
        const result = await query(sql)
        return result
       }


    
}





export default cargosModel