import React from "react";
import axios from "axios";
import { useEffect } from "react";
import video from "../../../../Videos Tenis para Analizar/Video Ary 3 Saque.mp4";
import "../stylesheets/VideoPageStylesheets/VideoPage.css";
import EndUseNavbar from "../components/EndUseNavbar";

function VideoPage() {
  /*
  const finalValues = { id: "21a5fe09-7018-4377-8ad2-774fba7dbbdb.mp4" }

  const useAxios = async (values)=>{
  await axios.post('http://localhost:4000/GetVideo', JSON.stringify(values), {
      headers: { 'Content-Type': 'application/JSON' },
      withCredentials: true,
    })

    .then(response => {console.log(response.data);}) 
    .catch(err => {console.log(err);})
  }
    
    
  useEffect(() => {
    useAxios(finalValues)
  },[])

  */

  return (
    <>
      <div className="wrapper-v">
        <div className="video-container">
          <video src={video} controls></video>
        </div>
        <div className="stats">
          <div className="minimap">
            <h2>Mapa de puntos</h2>
            <div className="map-container"></div>
          </div>
          <div className="speed">
            <h2>
              Velocidad <span>72</span> km/h
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoPage;

//Agregar botón para volver a la página previa.

//Heatmap:
//Puntos:
//Velocidad:

//Parte de lo de Alan

/*
  <div>Video Page</div>
  <button type="submit"> Subir </button>
  <video width="320" height="240" controls src= "D:\Documentos\GitHub\Hawkeye\Back-End\server/videos/21a5fe09-7018-4377-8ad2-774fba7dbbdb.mp4" type = "*video" />
*/
