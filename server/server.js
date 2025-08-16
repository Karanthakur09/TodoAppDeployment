import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js'
import userRoutes from './routes/userRoutes.js'
import connectDb from './config/db.js';

//env config before server setup
dotenv.config();
//DB connection
connectDb();
const app = express();
//ports
const PORT = process.env.PORT || 8000;

// Put your frontend's development URL here
const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
  origin: allowedOrigins,
  allowedHeaders: ['Content-Type', 'Authorization']
};
//middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));
//routes

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/todo', todoRoutes);

//listen
app.listen(PORT, () => {
    console.log(`Node server is running on PORT ${process.env.PORT} in mode ${process.env.DEV_MODE}`)
})
