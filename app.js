import express, { json } from 'express';
import empleadosRoutes from './routes/EmpleadosRoutes.js';
import administradoresRoutes from './routes/administradoresRoutes.js'


const app = express();

app.use(json());
app.disable('x-powered-by')

app.use('/api',empleadosRoutes);

app.use('/api2',administradoresRoutes);


const PORT = process.env.PORT ?? 3001

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})