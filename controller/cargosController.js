import cargosModel from  '../models/cargosModel.js';



class cargosControllers  { 


static getCargos = async (req,res)=>{
    try {
        const cargos = await cargosModel.getCargos();
        res.json(cargos);
        } catch (error) {
            res.status(500).json({message: error.message})
            console.log(error)
            }
}


//-------------------------------------------------------------------------------------------------------



static getCargoById= async  (req,res)=>{
    try {
        const {id} = req.params;
        const cargo = await cargosModel.getCargoById(id);
 
        if (cargo.length  === 0) {

            return res.status(404).json({ message: "Cargo not found" });
        }

        res.json(cargo);
        } catch (error) {
            res.status(500).json({message: error.message})
            console.log(error)
            }


        }


//------------------------------------------------------------------------------------------------------



    static  createCargo = async (req, res) => {
        const { cargo, tipo } = req.body;
        console.log(cargo)
        try {
            
           const cargoExists= await cargosModel.checkCargoExist(cargo)
//console.log(cargoExists)
           if (cargoExists.length) {
            return res.status(400).json({ message: "Cargo already exists" });
            
           }
           

            const newCargo = await cargosModel.createCargo(cargo,tipo);
            res.json({message:'Cargo creado exitosamente'});
            } catch (error) {
                res.status(500).json({message: error.message})
                console.log(error)
                }
                }


//---------------------------------------------------------------------------------------------------------------------


            static  updateCargo = async (req, res) => {
              const { id } = req.params;
              const { cargo, tipo } = req.body;

                
                try {

                    const updateFields= []
                    const values=[]

                    if(cargo){
                        updateFields.push('cargo')
                        values.push(cargo)

                    }

                    if(tipo){
                        updateFields.push('tipo')
                        values.push(tipo)

                    }
                    if(cargo){
                    const cargoExists = await cargosModel.checkCargoExist(cargo)
                    if (cargoExists.length) {
                        return res.status(400).json({ message: "Cargo already exists" });
                        }
                    
                    }

                  const update= await cargosModel.updateUser(id,updateFields,values)

                    } catch (error){
                        res.status(500).json({message: error.message})
    
                    }

                }

//-----------------------------------------------------------------------------------------------------------------------

                static  deleteCargo = async (req, res) => {
                    const { id } = req.params;
                    try {
                        const deleteCargo = await cargosModel.deleteCargo(id)
                        res.status(200).json({ message: "Cargo deleted successfully" });
                        } catch (error) {
                            res.status(500).json({ message: error.message });
                            }
                         }




//----------------------------------------------------------------------------------------------------------------------------

static getCargoByName= async  (req, res) => {
    const { name } = req.query;
    try {
        const getCargoByName = await cargosModel.checkCargoExist(name)


   if(getCargoByName.length === 0){
    return res.status(404).json({ message: "Cargo not found" });
    
      }
        
        res.status(200).json(getCargoByName)
        } catch (error) {
            res.status(500).json({ message: error.message });
            }
            }


//----------------------------------------------------------------------------------------------------------------------------------

  static addMultipleCargos  = async (req, res) => {
    const {cargos}= req.body


    const errors=[];
    const cargosToInsert=[]

    try {

        for(const cargol of cargos){
      const { cargo,tipo,id_departamento}= cargol

      if(!cargo  || !tipo || !id_departamento){
        errors.push({message: "Please fill all fields", field: "cargo"})
        }

        //verificar si los cargos existen
    const cargoExists = await  cargosModel.checkCargoExist(cargo)
    if(cargoExists.length > 0){
        errors.push({message: "Cargo already exists", field: "cargo"})
        }

        cargosToInsert.push({
            cargo,tipo,id_departamento
        })


            
            }

        if (cargosToInsert.length > 0) {
            const result = await cargosModel.addMultipleCargos(cargosToInsert)
            }

            if(errors.length > 0){
                res.status(400).json(errors)
            }else{
                res.status(201).json({message: "Cargos added successfully", result})
            }
          
            } catch (error) {
                res.status(500).json({ message: error.message });
                }



                }



          static deleteMultipleCargos = async (req,res)=>{
            const {cargos} = req.body

            if(!Array.isArray(cargos)){
                return res.status(400).json({error: 'Los Ids de cargos debe ser un arreglo'})
            }

            try {
                const deletePromises = cargos.map(cargo=>{
                    const {id}= cargo
                    return cargosModel.deleteCargo(id)
                })

                await Promise.all(deletePromises)


                res.json({message: 'Cargos eliminados con exito'})
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: error.message });

                
            }
          }      



          static getCargosByType = async (req,res)=>{
            const {type} = req.query
            try {
                const result = await cargosModel.getCargosByType(type)
                if(result.length === 0){
                    return res.status(404).json({message: 'No se encontraron cargos con el tipo solicitado'})
                }

                const  cargos= result
                const total_de_cargos= result.length

          const data= {
            cargos,
            total_de_cargos

          }

                res.json(data)
                } catch (error) {
                    console.log(error);
                    res.status(500).json({ message: error.message });
                    }
                    }


     
static getEstadisticas = async (req,res)=>{
    try {
        const result = await cargosModel.getCargos()
        if(result.length === 0){
            return res.status(404).json({message: 'No se datos'} )
        
        } 

                const Numero_de_Cargos = result.length

                const tipo = await cargosModel.getNumerodeCargosporTipo()

            


                const data = {
                    Numero_de_Cargos,
                    tipo
                }

                return res.status(200).json(data)
        
            }catch(error){
                console.log(error)
                return res.status(500).json({message: error.message})
            }
        

        }



            
        }


    


export default  cargosControllers;
