import { query as _query, pool } from '../db/db.js'
import bienesModel from '../models/bienesModel.js'




const getBienes = async (req, res) => {
    res.header('Access-Control-Allow-Origin','*')
    try {
        const results = await bienesModel.getBienes();
        res.json(results);

    } catch (err) {
        console.error('Error ejecutando la consulta:', err);
        res.status(500).json({ error: 'Error interno del servidor 1' });
    }
};


export default {getBienes}