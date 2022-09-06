import express from "express";
import 'dotenv/config';
import { connection } from './database.js';
import bcrypt from "bcryptjs";
import session from "express-session";
import ImageRoutes from './routes/user.routes.js'

const app = express();


app.set ('port', 4000);

app.use(express.json())

app.use(ImageRoutes)

app.listen (app.get('port'));

console.log('Tamos corriendo en el puerto', app.get('port'));


