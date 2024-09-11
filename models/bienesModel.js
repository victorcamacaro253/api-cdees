import { query,pool } from '../db/db.js';

const bienesModel ={


async getBienes(){

    const result = await query('SELECT * FROM bienes INNER JOIN departamentos ON bienes.Responsable=departamentos.id_departamento');
    return result;
}


}
export default bienesModel;
