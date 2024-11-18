import galeriaModel from "../models/galeriaModel.js";

class galeriaController {

    static getAllGaleria = async (req,res)=>{
        try {
            const result = await galeriaModel.getAllGaleria()
         
            if(!result){
                return res.status(400).json({error:'No se encontraron resultados'})
            }

            res.json(result)

        } catch (error) {
            return res.status(500).json({message:`Error interno del servidor`,error})
        }
    }


    static getGaleriaById = async (req,res)=>{
        const {id} = req.params
        try {
            const result = await galeriaModel.getGaleriaById(id)
            if(result.length===0){
                return res.status(400).json({message:`No se encontro imaganes para esa noticia`})
            }

         res.status(200).json(result)
            
        } catch (error) {
            return res.status(500).json({message:'Error interno del servidor'})
        }
    }

}


export default galeriaController