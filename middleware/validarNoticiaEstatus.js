
const validateStatus = async (req,res,next)=>{
    const {estatus} = req.body;
    const estadosValidos = ["publicado","borrador","archivado"]

try {
      // Normaliza el estado a minúsculas
      const estatusNormalizado = estatus.toLowerCase();

    if(!estadosValidos.includes(estatusNormalizado)){
        return res.status(400).json({error:"El estado no es válido"})
    }

      // Si el estado es válido, se puede guardar en el cuerpo de la solicitud
    req.body.estatus = estatusNormalizado; // Opcional: guardar el estado normalizado para su uso posterior

    next()
    
} catch (error) {
    console.log(error)
}
   

}

export default validateStatus;