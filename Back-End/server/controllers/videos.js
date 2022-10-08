import 'dotenv/config';
import { pool } from "../database.js";
import fetch from 'node-fetch';


//Subir videos
export const uploadVideo = async(req, res, err) => {
  if (err) {
    err.message = 'El video es muy pesado';
    return res.status(406).json({error: err});
  }

  const {idUsuario, titulo, rival, esPartido, esFavorito, fechaPartido} = req.body;
  const {idVideo} = req.file.filename;
  const {rutaVideo} = 'localhost:4000/videos/'.concat(req.file.filename);

  await pool.query("INSERT INTO videos (idUsuario, idVideo, rutaVideo, titulo, rival, esPartido, esFavorito, FechaPartido) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [idUsuario, idVideo, rutaVideo, titulo, rival, esPartido, esFavorito, fechaPartido]);
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
export const analysedVideo = async(req, res) => {
  if (!req.body.ruta){
    return res.status(500).json({ message: 'Error' })
  }
  const { rutaVideo } = req.body.ruta
  res.sendFile(rutaVideo)
}