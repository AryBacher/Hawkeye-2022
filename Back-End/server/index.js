import express from "express";
import 'dotenv/config';
import cors from 'cors';
import UserRoutes from './routes/user.routes.js';
//import VideoRoutes from './routes/videos.routes.js';

const app = express();

app.use(express.json())
app.use(cors())

app.use(UserRoutes)
//app.use(VideoRoutes)

app.set ('port', 4000);

app.listen (app.get('port'));

console.log('Tamos corriendo en el puerto', app.get('port'));