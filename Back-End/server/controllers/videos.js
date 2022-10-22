import 'dotenv/config';
import { pool } from "../database.js";
import { spawn } from 'child_process';
import { uploadCloudinary, deleteCloudinary } from '../cloudinary/config.js';
import fs from 'fs-extra';

//Subir videos
export const uploadVideo = async (req, res) => {

  console.log(req.body)

  const {idUsuario, titulo, rival, esPartido, esFavorito} = req.body;
  const fechaPartido = req.body.FechaPartido;
  const bool_esPartido = esPartido == 'true';
  const bool_esFavorito = esFavorito == 'true';
  const path = req.file.path

  const CloudinaryData = await uploadCloudinary(path)

  const rutaCloudinary = CloudinaryData.url
  const idCloudinary = CloudinaryData.public_id

  await pool.query("INSERT INTO videos (idUsuario, idCloudinary, urlVideo, titulo, rival, esPartido, esFavorito, FechaPartido) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [idUsuario, idCloudinary, rutaCloudinary, titulo, rival, bool_esPartido, bool_esFavorito, fechaPartido]);
  await fs.unlink(path)

  const childPython = spawn('python', ['script.py', path])

    childPython.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
    })

    childPython.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
    })

    childPython.on('close', (code) => {
        console.log(`child process exited with: ${code}`)
    })
  
  return res.status(200).json({message: "Video añadido"})
  };

//Borrar videos
export const deleteVideo = async(req, res) => {
  const {idUsuario, idCloudinary} = req.params

  deleteCloudinary(idCloudinary)

  await pool.query("DELETE FROM videos WHERE idUsuario = ? AND idCloudinary = ?", [idUsuario, idCloudinary])

  return res.status(200).json({message: "Video borrado"})
}

//Acutalizar datos del video
export const updateVideo = async(req, res) => {
  const {idUsuario, idCloudinary} = req.params
  const {titulo, rival, esPartido, esFavorito, fechaPartido} = req.body;

  await pool.query("UPDATE videos SET (titulo, rival, esPartido, esFavorito, FechaPartido) = (?, ?, ?, ?, ?) WHERE idUsuario = ? AND idCloudinary = ?", [titulo, rival, esPartido, esFavorito, fechaPartido, idUsuario, idCloudinary]);
  
  return res.status(200).json({message: "Datos del video actualizados"})
}

//Filtrar videos
export const filterVideo = async(req, res) => {
  const idUsuario = req.params;
  const busqueda = req.body;

  const [urlVideo] = await pool.query("SELECT urlVideo from videos WHERE idUsuario = ? AND titulo LIKE ?", [idUsuario, busqueda]);
  res.status(200).json(urlVideo);
}

//Seleccionar el video elegido
export const getVideo = async(req, res) => {
  const {idUsuario, idCloudinary}  = req.params

  const [urlVideo] = await pool.query("Select urlVideo FROM videos WHERE idUsuario = ? AND idcloudinary = ?", [idUsuario, idCloudinary])

  return res.status(200).json(urlVideo)
}

/*//Mandar videos a analizar
export const sendVideo = async(req, res) => {
  if (!req.body.ruta){
    return res.status(500).json({ message: 'Error' })
  }
  const { rutaVideo } = req.body.ruta
  res.sendFile(rutaVideo)
}



//Multer para manipular los videos
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: ('./videos'),
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
  }
  });

export const redirect = multer({
  storage,
  dest: './videos',
  limits: {fileSize: 100000000000},
  fileFilter: (req, file, cb) => {
      const filetypes = /mp4|avi/
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname));
      if (extname && mimetype){
          return cb(null, true);
      }
      cb('Error: tipo de archivo no válido');
  }
}).single('video')*/