import React from "react";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import video from "../../../../Videos Tenis para Analizar/InkedInkedTennisBrothersVideo1080p.mp4";
import "../stylesheets/VideoPageStylesheets/VideoPage.css";
import { Button, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import BtnStar from "../components/BtnStar";
import { useParams } from 'react-router-dom'

function VideoPage() {
  const {id} = useParams()
  const {idVideo} = useParams()

  //Estados para el video, los piques, el heatmap y la velocidad
  const [urlVideo, setUrlVideo] = useState();
  const [arrayPiques, setArrayPiques] = useState();
  const [urlHeatmap, setUrlHeatmap] = useState();
  const [arrayVelocidad, setArrayVelocidad] = useState();
  const [velFinal, setVelFinal] = useState(0);
  const [titulo, setTitulo] = useState();

  //Que se fije si paso 0.1s del preVideoTime y si es asi que se fije si hay un punto nuevo y se le sume 0.1 a preVideoTime.

  //Sabemos cuando se ha pausado, cuando esta play y console logueamos cada segundo que pasa estando runneando.

  const videoTag = useRef();

  const writeTime = () => {
    console.log("Segundo " + videoTag.current.currentTime + " del video.");
  };

  let paused = true;

  /*const pts_pique = [
    { x: 0, y: 0, second: 5 },
    { x: 200, y: 35, second: 10.0 },
    { x: 200, y: 100, second: 15.0 },
    { x: 120, y: 120, second: 25.0 },
    { x: 35, y: 41, second: 7.0 },
    { x: 200, y: 400, second: 30.0 },
    { x: 300, y: 300, second: 20.0 },
  ];*/

  // script.py
  //const pts_pique = [[[100, 194], 1.4], [[65, 126], 2.03], [[61, 192], 2.77], [[74, 357], 3.03], [[80, 399], 3.43], [[54, 378], 5.7], [[4, 50], 9.07], [[91, 83], 10.93], [[42, 385], 12.53], [[30, 447], 17.97], [[2, 295], 21.33], [[121, 466], 23.6], [[122, 427], 23.63], [[123, 380], 23.67], [[124, 329], 23.7], [[124, 270], 23.73], [[125, 208], 23.8], [[126, 143], 23.83], [[149, 24], 25.93], [[145, 80], 26.1], [[160, 422], 26.87], [[160, 437], 26.9], [[158, 451], 26.93], [[154, 416], 27.0], [[143, 417], 27.03], [[158, 425], 27.13], [[120, 357], 29.27], [[132, 428], 32.07], [[152, 433], 32.4], [[152, 386], 32.43], [[153, 336], 32.47], [[154, 286], 32.5], [[155, 238], 32.53], [[154, 194], 32.6], [[153, 162], 32.63], [[154, 113], 32.67], [[154, 80], 32.7], [[59, 419], 35.0], [[38, 89], 37.47], [[3, 360], 37.97], [[8, 39], 38.23], [[22, 0], 38.27], [[24, 410], 43.2], [[134, 461], 45.77], [[156, 390], 45.97], [[163, 408], 46.03], [[161, 117], 46.7], [[150, 85], 46.73], [[102, 6], 48.73], [[113, 451], 51.4], [[112, 454], 51.43], [[44, 371], 54.93], [[13, 379], 55.47], [[57, 405], 56.37], [[62, 407], 56.63], [[113, 377], 57.7], [[137, 373], 58.07], [[96, 17], 58.4], [[105, 357], 60.33]]
  
  // bounce_detection
  //const pts_pique = [[[110, 211], 1.4], [[78, 411], 3.43], [[80, 399], 3.47], [[58, 382], 5.7], [[18, 429], 6.2], [[14, 413], 9.07], [[47, 390], 12.53], [[5, 169], 13.33], [[14, 94], 13.37], [[22, 35], 13.43], [[57, 87], 17.5], [[6, 236], 18.43], [[9, 180], 18.47], [[27, 29], 18.6], 
  //[[130, 352], 26.3], [[158, 451], 27.0], [[111, 321], 29.2], [[116, 360], 29.27], [[157, 267], 29.9], [[154, 225], 29.93], [[152, 179], 29.97], [[152, 179], 30.0], [[135, 151], 31.73], [[130, 430], 32.07], [[152, 387], 32.47], [[82, 66], 35.37], [[87, 420], 35.73], [[31, 222], 37.27], [[27, 370], 37.47], [[67, 43], 39.83], [[64, 103], 39.87], [[59, 145], 39.9], [[18, 396], 40.63], [[22, 349], 40.67], [[66, 38], 42.8], [[60, 101], 42.83], [[49, 193], 42.9], [[30, 411], 43.2], [[157, 410], 46.03], [[129, 316], 48.73], [[113, 461], 51.3], [[90, 14], 51.73], [[48, 374], 54.93], [[18, 422], 55.47], [[14, 379], 55.5], [[6, 286], 55.57], [[6, 286], 55.6], [[4, 243], 55.63], [[57, 405], 56.37], [[57, 405], 56.4], [[58, 406], 56.43], [[59, 408], 56.5], [[89, 111], 57.43], [[111, 379], 57.7], [[139, 402], 58.07], [[118, 417], 59.93], [[84, 38], 59.97], [[84, 38], 60.0], [[86, 82], 60.03], [[103, 362], 60.33]]
  
  // ball_tracking de ary
  //const pts_piques = [[[1501, 2915], 1.4], [[937, 2991], 2.77], [[1115, 5361], 3.03], [[1200, 5990], 3.43], [[814, 5683], 5.7], [[318, 5784], 6.2], [[108, 6114], 9.07], [[635, 5787], 12.53], [[635, 5787], 12.57], [[463, 6707], 17.97], [[1828, 6992], 23.6], [[1810, 5364], 29.27], [[1991, 6432], 32.07], [[2287, 6502], 32.4], [[895, 6292], 35.0], [[331, 5490], 37.47], [[366, 6156], 43.2], [[2354, 5850], 45.97], [[2446, 6124], 46.03], [[2022, 4625], 48.73], [[2022, 4625], 48.77], [[1702, 6779], 51.4], [[673, 5577], 54.93], [[673, 5577], 54.97], [[209, 5695], 55.47], [[861, 6080], 56.37], [[936, 6107], 56.63], [[1708, 5658], 57.7], [[2062, 5600], 58.07], [[1579, 5368], 60.33], [[1579, 5368], 60.37]]
  const pts_pique = (arrayPiques)
  console.log(pts_pique)

  const velocidades = arrayVelocidad
  console.log(velocidades)
  
  /*let array2 = pts_pique.split('(')
  console.log(array2[0])
  let array3 = array2.split(')')
  console.log(array2)*/
  //console.log("asdasd " + pts_pique[0])
  const canvas = useRef(null);

  const updateTime = () => {
    setInterval(() => {

      if (!paused) {
        const circle = canvas.current.getContext("2d");
        const time = videoTag.current.currentTime;

        // Selecciona los piques cuyo tiempo es menor al tiempo del video
        let array = pts_pique.split('(')
        let array2 = array.toString()
        let array3 = array2.split(')')
        let array4 = array3.toString()
        let array5 = array4.replaceAll(',', '')
        let array6 = array5.replaceAll(' ', ',')
        let array7 = array6.split(',')
        let array8 = array7.toString()
        let array9 = array8.match(/\d+(?:\.\d+)?/g).map(Number)
        var array10 = []
        for (let i = 0; i < array9.length; i+= 3){
          array10.push([[array9[i], array9[i+1]], array9[i+2]])
        }
        console.log(array10)


        let pts_utiles = array10.filter((pt) => pt[1] <= time);
        pts_utiles = pts_utiles.reverse()
        console.log(pts_utiles)
        //console.log(pts_utiles)

        if (pts_utiles.length > 5){
          pts_utiles = pts_utiles.slice(0,6)
          circle.clearRect(0, 0, 1000, 1000);
        }
        circle.clearRect(0, 0, 1000, 1000);

        const drawCircle = (pt) => {   
            circle.beginPath();
            circle.arc(parseInt((pt[0][0]) / 15) + 51, parseInt((pt[0][1]) / 15) + 25, 3.5, 0, Math.PI * 2);
            circle.fillStyle = "#4ECB71";
            circle.fill();
            circle.closePath();
        };

        let array11 = velocidades.split('(')
        let array12 = array11.toString()
        let array13 = array12.split(')')
        let array14 = array13.toString()
        let array15 = array14.replaceAll(',', '')
        let array16 = array15.replaceAll(' ', ',')
        let array17 = array16.split(',')
        let array18 = array17.toString()
        let array19 = array18.match(/\d+(?:\.\d+)?/g).map(Number)
        var array20 = []
        for (let i = 0; i < array19.length; i+= 2){
          array20.push([[array19[i]], [array19[i+1]]])
        }
        console.log(array20)

        const writeSpeed = (vel) => {
            setVelFinal(vel)
        };

        let velActual = array20.filter((pt) => pt[1] <= time);
        velActual = velActual.reverse()
        console.log(velActual)

        if (velActual == []){
          velActual[0][0] = 0
        }

        writeSpeed(velActual[0][0])

        pts_utiles.map((pt) => {
          //console.log(pts_utiles);
          drawCircle(pt);
        });       
      }
    }, 100);
    
  };

  updateTime();

  // Estado para poder hacer ir switcheando de mapa y funciones para switchear entre ambos.

  const [mapActive, setMapActive] = useState(0);

  const handleNext = () => {
    if (mapActive === 0) {
      setMapActive(1);
    } else {
      setMapActive(0);
    }
    console.log(mapActive);
  };

  const handleBack = () => {
    if (mapActive === 1) {
      setMapActive(0);
    } else {
      setMapActive(1);
    }
    console.log(mapActive);
  };

  // Dibujar los circulos del canvas según las coordenadas.

  // Recibir el video seleccionado
  useEffect(() => {
    const getVideo = async () => {
      const videoData = await axios.get(
        `http://localhost:4000/GetVideo/${id}/${idVideo}`
      );
      setUrlVideo(videoData.data.urlVideo)
      setUrlHeatmap(videoData.data.urlHeatmap)
      setTitulo(videoData.data.titulo)

      setArrayPiques(videoData.data.arrayPiques)
      setArrayVelocidad(videoData.data.velocidades)
    };
    getVideo();
  }, []);

  return (
    <>
      <div className="wrapper-v">
        <Button className="btn-back" href={`/Analysis/${id}`} startIcon={<ChevronLeftIcon />}>
          Volver
        </Button>
        <div className="header-video">
          {" "}
          {/*Aca podemos meter cosas como el boton de volver, el título, un punto de color para saber el tipo de análisis, el boton para agregar a destacados y hasta un hipotetico botón de edición.*/}
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: "15px" }}
          >
            <rect width="10" height="10" rx="5" fill="#0075FF" />{" "}
            {/* Esto es variable y depende del tipo de análisis*/}
          </svg>
          <h1>{ titulo }</h1>
          <BtnStar state={false} />
        </div>
        <div className="content">
          <video
            id='videito'
            src={urlVideo}
            controls
            ref={videoTag}
            onf
            onPlay={() => {
              paused = false;
            }}
            onPause={() => {
              paused = true;
            }}
          ></video>
          <div className="stats">
            <div className="minimap-container">
              <div className="title-map">
                <IconButton onClick={handleBack} disabled={mapActive === 0}>{/* id={mapActive  === 0 ? "left-chevron" : ""} */}
                  <ChevronLeftIcon />
                </IconButton>
                <div className="title">
                  {" "}
                  {/*Podemos ver de que lo haga al toque o con esta animación*/}
                  <h2
                    className={
                      mapActive === 0 ? "points" : "points points-disabled"
                    }
                  >
                    Mapa de puntos
                  </h2>
                  <h2 className={mapActive === 1 ? "heat heat-active" : "heat"}>
                    Mapa de calor
                  </h2>
                </div>
                <IconButton onClick={handleNext} disabled={mapActive === 1}> {/*  id={mapActive  === 1 ? "right-chevron" : ""} */}
                  <ChevronRightIcon />
                </IconButton>
              </div>
              <div className="minimap">
                <div
                  className={
                    mapActive === 0 ? "points" : "points points-disabled"
                  }
                >
                  <canvas
                    id="canvas"
                    ref={canvas}
                    width="268px"
                    height="524px"
                    style={{
                      position: "relative",
                      left: "0",
                      top: "0",
                      zIndex: "100",
                    }}
                  ></canvas>
                </div>{" "}
                {/*points*/}
                <div className={mapActive === 1 ? "heat heat-active" : "heat"} style={{ backgroundImage: `url(${urlHeatmap})`}}>
                </div>{" "}
                {/*heat*/}
              </div>
              <div className="map-indicator">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1.33264"
                    y="1.26953"
                    width="9"
                    height="9"
                    rx="4.5"
                    fill={mapActive === 0 ? "#4ECB71" : "#151F27"}
                  />
                  <rect
                    x="1.33264"
                    y="1.26953"
                    width="9"
                    height="9"
                    rx="4.5"
                    stroke={mapActive === 0 ? "#4ECB71" : "#233545"}
                  />
                </svg>
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1.33264"
                    y="1.26953"
                    width="9"
                    height="9"
                    rx="4.5"
                    fill={mapActive === 1 ? "#4ECB71" : "#151F27"}
                  />
                  <rect
                    x="1.33264"
                    y="1.26953"
                    width="9"
                    height="9"
                    rx="4.5"
                    stroke={mapActive === 1 ? "#4ECB71" : "#233545"}
                  />
                </svg>
              </div>
            </div>
            <div className="speed-container">
              <h2>
                Velocidad <span>{velFinal}</span> km/h
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoPage;

/*

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

*/

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
