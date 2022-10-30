import 'dotenv/config';
import { pool } from "../database.js";
import { uploadCloudinary, deleteCloudinary, getThumbnail } from '../cloudinary/config.js';
import fs from 'fs-extra';
import fetch from 'node-fetch'

//Subir videos
export const uploadVideo = async (req, res) => {
  try{
  const {idUsuario, title, rival, date, type, corners} = req.body;
  console.log(req.file.path)
  const path = req.file.path
  
  console.log(corners)
  //{"A":{"x":283.421875,"y":217.5},"B":{"x":283.421875,"y":217.5},"C":{"x":283.421875,"y":217.5},"D":{"x":283.421875,"y":217.5}}
  var cornerXone = corners.split(':')[2]
  var cornerYone = corners.split(':')[3]
  var cornerXtwo = corners.split(':')[5]
  var cornerYtwo = corners.split(':')[6]
  var cornerXthree = corners.split(':')[8]
  var cornerYthree = corners.split(':')[9]
  var cornerXfour = corners.split(':')[11]
  var cornerYfour = corners.split(':')[12]
  
  cornerXone = parseInt(cornerXone.split('.')[0])
  cornerXtwo = parseInt(cornerXtwo.split('.')[0])
  cornerXthree = parseInt(cornerXthree.split('.')[0])
  cornerXfour = parseInt(cornerXfour.split('.')[0])
  cornerYone = parseInt(cornerYone.split('.')[0])
  cornerYtwo = parseInt(cornerYtwo.split('.')[0])
  cornerYthree =  parseInt(cornerYthree.split('.')[0])
  cornerYfour = parseInt(cornerYfour.split('.')[0])

  const finalCorners = [[cornerXone, cornerYone], [cornerXtwo, cornerYtwo], [cornerXthree, cornerYthree], [cornerXfour, cornerYfour]]
  console.log(finalCorners)

  const CloudinaryData = await uploadCloudinary(path)

  const rutaCloudinary = CloudinaryData.url
  const idCloudinary = CloudinaryData.public_id

  const rutaThumbnail = await getThumbnail(rutaCloudinary)

  await pool.query("INSERT INTO videos (idUsuario, idCloudinary, urlVideo, urlMiniatura, titulo, rival, tipo, FechaPartido, arrayPiques) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [idUsuario, idCloudinary, rutaCloudinary, rutaThumbnail, title, rival, type, date, corners]);
  
  const rutaPython = `../Back-End/server/${path}`
  console.log(rutaPython)

  const flaskParams = {rutaPython, finalCorners}

  const flaskData = await fetch('http://127.0.0.1:5000/analyse', {
	method: 'post',
	body: JSON.stringify(flaskParams),
	headers: {'Content-Type': 'application/json'}
});
  const datosAnalizados = await flaskData.json();
  console.log(datosAnalizados)

  const puntosPique = datosAnalizados.puntosPique
  const velocidad = datosAnalizados.velocidades

  const HeatmapData = await uploadCloudinary(`../../Back-End-Flask/heatmap.jpg`)
  console.log(HeatmapData)
  const urlHeatmap = HeatmapData.url

  await pool.query("UPDATE videos SET arrayPiques = '?', urlHeatmap = ?, velocidades = '?' WHERE idCloudinary = ?", [puntosPique, urlHeatmap, velocidad, idCloudinary])

  await fs.unlink(path)
  
  return res.status(200).json({ puntosPique, urlHeatmap, velocidad })
  }
  catch(error) {
    console.log(error);
  }
  };

//Conseguir Username
export const getUsername = async (req, res) => {
  const {idUsuario} = req.params
  
  const [username] = await pool.query("SELECT nombre FROM usuarios WHERE id = ?", [idUsuario])
  
  return res.status(200).json({username})
}

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
  const { idUsuario } = req.params;
  const { searchValue } = req.params;

  const [datosVideo] = await pool.query("SELECT * from videos WHERE idUsuario = ? AND titulo LIKE CONCAT(?, '%')", [idUsuario, searchValue]);
  const [datosEntrenamientos] = await pool.query("SELECT * from videos WHERE idUsuario = ? AND tipo = 'Entrenamiento' AND titulo LIKE CONCAT(?, '%')", [idUsuario, searchValue]); 
  const [datosPartidos] = await pool.query("SELECT * from videos WHERE idUsuario = ? AND tipo = 'Partido' AND titulo LIKE CONCAT(?, '%')", [idUsuario, searchValue]); 
  //const [datosUser] = await pool.query("SELECT nombre, email FROM usuarios WHERE id = ?", [idUsuario])
  const cantEntrenamientos = datosEntrenamientos.length
  const cantPartidos = datosPartidos.length
  const cantVideos = datosVideo.length
  //const userName = datosUser[0].nombre
  //const userEmail = datosUser[0].email

  res.status(200).json({datosVideo, cantVideos, cantEntrenamientos, cantPartidos});
}

//Seleccionar videos según usuario
export const getVideos = async (req, res) => {
 const { idUsuario } = req.params;
 
 const [datosVideo] = await pool.query("SELECT * from videos WHERE idUsuario = ?", [idUsuario]);
 const [datosEntrenamientos] = await pool.query("SELECT * from videos WHERE idUsuario = ? AND tipo = 'Entrenamiento'", [idUsuario]); 
 const [datosPartidos] = await pool.query("SELECT * from videos WHERE idUsuario = ? AND tipo = 'Partido'", [idUsuario]); 
 const [datosUser] = await pool.query("SELECT nombre, email FROM usuarios WHERE id = ?", [idUsuario])
 const cantEntrenamientos = datosEntrenamientos.length
 const cantPartidos = datosPartidos.length
 const cantVideos = datosVideo.length
 const userName = datosUser[0].nombre
 const userEmail = datosUser[0].email

  res.status(200).json({datosVideo, cantVideos, cantEntrenamientos, cantPartidos, userName, userEmail});
}

//Seleccionar el video elegido
export const getVideo = async(req, res) => {
  const {idUsuario, idCloudinary}  = req.params

  const [datosVideo] = await pool.query("Select urlVideo, arrayPiques, urlHeatmap, velocidades, titulo FROM videos WHERE idUsuario = ? AND idcloudinary = ?", [idUsuario, idCloudinary])
  const urlVideo = datosVideo[0]
  const arrayPiques = datosVideo[1]
  const urlHeatmap = datosVideo[2]
  const velocidades = datosVideo[3]
  const titulo = datosVideo[4]
  return res.status(200).json(urlVideo, arrayPiques, urlHeatmap, velocidades, titulo)
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