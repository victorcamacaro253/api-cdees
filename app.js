import express, { json } from 'express';
import empleadosRoutes from './routes/EmpleadosRoutes.js';
import administradoresRoutes from './routes/administradoresRoutes.js'
import bienesRoutes from './routes/bienesRoutes.js'
import helmet from 'helmet';
import cors from 'cors'

const app = express();

app.use(cors())
app.use(json());
app.disable('x-powered-by')

app.use(helmet());

app.use('/api',empleadosRoutes);

app.use('/api2',administradoresRoutes);

app.use('/api3',bienesRoutes);


const PORT = process.env.PORT ?? 3001

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})