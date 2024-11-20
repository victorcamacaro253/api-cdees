import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message:{
        message:'Demasiados solicitudes desde esta IP. Por favor, intenta de nuevo más tarde.',
    }
    });
    
    export default limiter;