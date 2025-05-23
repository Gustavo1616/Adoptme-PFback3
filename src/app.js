import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mockingPetsRouter from './routes/mockingpets.router.js';
import { connectDB } from './config/db.js';
import { config } from './config/config.js';


const app = express();
mongoose.set('strictQuery', true);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/mockingpets', mockingPetsRouter);

app.listen(config.PORT,()=>console.log(`Escuchando en ${config.PORT}`));
connectDB();