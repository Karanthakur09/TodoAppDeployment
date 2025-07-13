import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js'

//env config before server setup
dotenv.config();

const app=express();
//ports
const PORT=process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
//routes

app.use('/api/v1/todo',todoRoutes);

//listen
app.listen(PORT,()=>{
    console.log(`Node server is running on PORT ${process.env.PORT} in mode ${process.env.DEV_MODE}`)
})
