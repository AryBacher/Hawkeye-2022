import 'dotenv/config';
import { pool } from "../database.js";
import fetch from 'node-fetch';


//Subir videos
export const uploadVideo = async (req, res) => {
  

  console.log('hola')

  const {idUsuario, titulo, rival, esPartido, esFavorito} = req.body;
  const fechaPartido = req.body.FechaPartido;
  const idVideo = req.file.filename;
  const rutaVideo = 'localhost:4000/Back-End/server/videos/'.concat(req.file.filename);
  const bool_esPartido = esPartido == 'true';
  const bool_esFavorito = esFavorito == 'true';

  console.log(idVideo)
  console.log(rutaVideo)
  console.log(fechaPartido)
  console.log(bool_esFavorito)
  console.log(bool_esPartido)

  await pool.query("INSERT INTO videos (idUsuario, idVideo, rutaVideo, titulo, rival, esPartido, esFavorito, FechaPartido) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [idUsuario, idVideo, rutaVideo, titulo, rival, bool_esPartido, bool_esFavorito, fechaPartido]);
  return res.status(200).json({message: "Video añadido"})
  };



//Filtrar videos
export const filterVideo = async(req, res) => {

  const filtro = VARIABLEGLOBALFILTRO;
  const busqueda = req.body;
  const titulo = await connection.query("SELECT idVideo from videos WHERE "%filtro%" LIKE "%busqueda%"");
  res.json(titulo);

}

//Borrar videos
export const deleteVideo = async(req, res) => {
  const {name} = req.file.filename;
  await pool.query("DELETE * FROM videos WHERE idVideo ="%name%"");
}

//Acutalizar datos del video
export const updateVideo = async(req, res) => {
  const {idUsuario, titulo, rival, esPartido, esFavorito, fechaPartido} = req.body;
  const {idVideo} = req.file.filename;
  const {rutaVideo} = 'localhost:4000/videos/'.concat(req.file.filename);

  await pool.query("UPDATE videos SET (idUsuario, idVideo, rutaVideo, titulo, rival, esPartido, esFavorito, FechaPartido) = (?, ?, ?, ?, ?, ?, ?, ?)", [idUsuario, idVideo, rutaVideo, titulo, rival, esPartido, esFavorito, fechaPartido]);
  return res.status(200).json({message: "Video actualizado"})
}

//Mandar videos a analizar
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
}).single('video')


//Mostrar un único video
export const showVideo = async(req, res) => {

}

const __dirname = path.resolve();

//Seleccionar los videos
export const getVideos = async(req, res) => {
  const { id } = req.body
  const [video] = await pool.query("Select * FROM videos WHERE idVideo = ?", id)
  const finalPath = __dirname + video[0].rutaVideo
  return res.sendFile(finalPath)
}