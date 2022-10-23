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
        <EndUseNavbar grabarId="" análisisId="análisis" ayudaId="" />
        <div className="sides">
          <div className="video-container">
            <div className="text-title">
              <h1>Ary Bacher entrenamiento 1</h1>
              <p>Entrenamiento del 09-11-22</p>
            </div>
            <video src={video} controls></video>
          </div>
          <div className="stats">
            <div className="minimap">
              Minimapa de puntos/heatmap
            </div>
            <div className="speed">
              Velocidad
            </div>
            <div className="others">
              Otras estadísticas
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoPage;

//Parte de lo de Alan

/*
  <div>Video Page</div>
  <button type="submit"> Subir </button>
  <video width="320" height="240" controls src= "D:\Documentos\GitHub\Hawkeye\Back-End\server/videos/21a5fe09-7018-4377-8ad2-774fba7dbbdb.mp4" type = "*video" />
*/
