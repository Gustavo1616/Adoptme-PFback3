import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mockingRouter from './routes/mocking.router.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectDB } from './config/db.js';
import { config } from './config/config.js';
import logger from './utils/logger.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUiExpress from "swagger-ui-express";

const app = express();
mongoose.set('strictQuery', true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mockingRouter);
app.use('/loggerTest', (req, res) => {
    logger.debug("Mensaje de debug");
    logger.http("Mensaje de http")
    logger.info("Mensaje de info");
    logger.warn("Mensaje de warning");
    logger.error("Mensaje de error");
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: "Pruebas log OK...!!!" });
})
app.use(errorHandler)

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Documentacion de API de adopción de mascotas",
            description: "API para gestionar la adopción de mascotas",
            version: "1.0.0"
        },
        servers: [
        {
            url: "http://localhost:3000",
            description: "Production"
        }
        ]
    },
    apis: ["./src/docs/*.yaml"]
}
const specs = swaggerJsDoc(swaggerOptions);
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

const server = app.listen(config.PORT, () => {
    logger.info(`Escuchando en ${config.PORT}`)
})
connectDB();