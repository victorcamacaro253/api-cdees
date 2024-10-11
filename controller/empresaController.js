import empresaModel from '../models/empresaModel.js'

class empresaController {

  static getCompanyInfo = async (req,res)=>{

        try {
            
      const result = await empresaModel.getCompanyInfo()
      return res.json(result)

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Error al obtener la información de la empresa"});
            
        }

    }


    static addEmpresa = async (req,res)=>{
        const  {items} = req.body

        if (!Array.isArray(items) || items.length === 0) {
            throw new Error('La variable empresas debe ser un arreglo no vacío');
          }

        try {

            const result= await  empresaModel.addEmpresa(items);

     

            return res.json({message:'Empresa insertada correctamente'})

            
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Error al agregar la empresa"});
            
        }
    }

    static deleteCompany = async  (req,res)=>{
        const {id} = req.params
        try {
            
     const  result = await empresaModel.deleteCompany(id)

     return result ? res.json(result) : res.status(404).json({ message: "La empresa no existe" });



        } catch (error) {
            console.log(error)
            return res.status(500).json({message: "Error al eliminar la empresa"});
            
        }

    }

}

export default empresaController
