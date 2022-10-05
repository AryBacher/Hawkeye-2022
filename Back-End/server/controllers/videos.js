import 'dotenv/config';
import { pool } from "../database.js";

//Subir videos
export const uploadVideo = async(req, res) => {

}


//Filtrar videos
export const filterVideo = async(req, res) => {
  const filtro = VARIABLEGLOBALFILTRO;
  const busqueda = req.body;
  const titulo = await connection.query("SELECT idVideo from videos WHERE "%filtro%" LIKE '"%busqueda%"'");
  res.json(titulo);
}




export const uploadImage = async(req, res, err) => {
  if (err) {
    err.message = 'El video es muy pesado';
    return res.status(406).json({error: err});
    }
  const {idUsuario, titulo, rival, esPartido, esFavorito, fechaPartido} = req.body;
  await pool.query("INSERT INTO videos (idUsuario, idVideo, rutaVideo, titulo, rival, esPartido, esFavorito, FechaPartido) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [idUsuario, titulo, rival, esPartido, esFavorito, fechaPartido]);
  return res.status(200).json({message: "Video añadido"})
  };