import express from "express";
import 'dotenv/config';
import cors from 'cors';
import multer, { diskStorage } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import UserRoutes from './routes/user.routes.js';
import VideoRoutes from './routes/videos.routes.js';

const app = express();

app.use(express.json())

app.use(cors())


const storage = multer.diskStorage({
    destination: ('./videos'),
    filename: (req, file, cb) => {
      cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    }
    });

app.use(multer({
    storage,
    dest: './videos',
    limits: {fileSize: 100000000000},
    fileFilter: (req, file, cb) => {
        const filetypes = /mp4/
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (extname && mimetype){
            return cb(null, true);
        }
        cb('Error: tipo de archivo no válido');
    }
}).single('video'))

app.use(UserRoutes)
app.use(VideoRoutes)

app.set ('port', process.env.PORT);

app.listen (app.get('port'));

console.log('Tamos corriendo en el puerto', app.get('port'));