import express, { json } from 'express';
import routes  from './routes/index.js';
import helmet from 'helmet';
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser'; // <-- Agrega esto
import csrf from 'csurf'; // <-- Agrega esto tam
import compression from 'compression';
import morgan from 'morgan';
import limiter from './middleware/rateLimit.js';

// Get the current file's directory (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(cors())
// Añadir protección CSRF con cookies
const csrfProtection = csrf({ cookie: true });
// Middleware para procesar cookies
app.use(cookieParser());

app.use(morgan('dev'));

app.use(limiter); // Aplica el rate limiting a todas las rutas


app.use(json());
app.disable('x-powered-by')

app.use(helmet());
/*
app.get('/', (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  res.send(`Your IP Address is ${clientIp}`);
});
*/

app.get('/', (req, res) => {
  // Obtener la IP directamente
  let ip = req.ip;
  // Si estás detrás de un proxy o balanceador de carga (como Nginx), utiliza el encabezado 'x-forwarded-for'
  let forwarded = req.headers['x-forwarded-for'];
  // Usar la IP del encabezado si está presente
  ip = forwarded ? forwarded.split(',')[0] : ip;
  res.send(`Tu dirección IP es: ${ip}`);
});

app.use('/uploads',express.static(path.join(__dirname,'uploads')));

app.use(compression())

// Generar y enviar el token CSRF en una ruta
app.get('/csrf-token', csrfProtection, (req, res) => {
    // Envía el token CSRF en una cookie llamada 'XSRF-TOKEN'
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.json({ csrfToken: req.csrfToken() });
  });
  
 

app.use(routes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal' });
});


const PORT = process.env.PORT ?? 3001

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})