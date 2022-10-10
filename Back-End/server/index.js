import express from "express";
import 'dotenv/config';
import cors from 'cors';
import UserRoutes from './routes/user.routes.js';
import VideoRoutes from './routes/videos.routes.js';
import { credentials } from "./controllers/user.js";
import corsOptions from "./config/corsOptions.js";
import path from 'path';


const app = express();

app.set('view engine', 'ejs')

app.use(credentials)
app.use(express.json())

app.use(cors(corsOptions))




app.use(UserRoutes)
app.use(VideoRoutes)

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'videos')));

// Prueba para subir video
app.get('/', (req, res) =>{
    res.render('index.ejs')
})

app.set ('port', parseInt(process.env.PORT));

app.listen (app.get('port'));

console.log('Tamos corriendo en el puerto', app.get('port'));