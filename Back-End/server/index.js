import 'dotenv/config';
import express from "express";
import cors from 'cors';
import { connection } from './database.js';
import bcrypt from "bcryptjs";
import session from "express-session";
import ImageRoutes from './routes/user.routes.js';
import jwt from 'jsonwebtoken';


const app = express();

app.use(express.json())
app.use(cors())

app.set ('port', 4000);

app.use(ImageRoutes)

app.listen (app.get('port'));

console.log('Tamos corriendo en el puerto', app.get('port'));


