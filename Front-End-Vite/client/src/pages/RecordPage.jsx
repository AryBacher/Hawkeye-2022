import React from "react";
import "../stylesheets/RecordPageStylesheets/RecordPage.css";
import EndUseNavbar from "../components/EndUseNavbar";
import {
  TextField,
  Button,
  Step,
  Stepper,
  StepLabel,
  capitalize,
  Alert,
  Collapse,
  IconButton,
  ButtonGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TypeField from "../components/Form UploadVideo Components/TypeField";
import {
  Form,
  Formik,
  Field,
  useFormik,
  useFormikContext,
  setIn,
} from "formik";
import { object, string, date, mixed } from "yup";
import { useState, Fragment, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import AlertSuccess from "../components/AlertSuccess";
import { height } from "@mui/system";
import { useParams } from "react-router-dom";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveIcon from "@mui/icons-material/Save";
import zIndex from "@mui/material/styles/zIndex";

function RecordPage() {
  const { id } = useParams();

  //Valores iniciales de los campos para colocar en el Formik "initialValues".

  const [corners, setCorners] = useState(null);

  const initialValues = {
    title: "",
    type: "",
    rival: "",
    date: "",
    file: null,
    corners: {corners},
  };

  //Sacar el estado del nombre de archivo para así luego usarlo en el span del input customizado además del video actual para usar en la preview.

  const [fileName, setFileName] = useState("");
  const [currentVideo, setCurrentVideo] = useState();

  //Función para fetchear los valores finales del formulario.

  const [userName, setUserName] = useState("");

  const useAxios = async (finalValues) => {
    console.log(finalValues);
    const formData = new FormData();
    formData.append("idUsuario", id);
    formData.append("title", finalValues.title);
    formData.append("type", finalValues.type);
    formData.append("rival", finalValues.rival);
    formData.append("date", finalValues.date);
    formData.append("video", finalValues.file);
    formData.append("corners", finalValues.corners);
    console.log([...formData]);
    console.log(finalValues.corners[1]);
    const response = await axios.post(
      "http://localhost:4000/UploadVideo",
      formData,
      {
        //headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    console.log(response);
    setLoaded(true);
  };

  useEffect(() => {
    //Conseguir nombre de ususario
    const getUsername = async () => {
      const response = await axios.get(
        `http://localhost:4000/GetUsername/${id}`
      );
      setUserName(response.data.username[0].nombre);
      console.log(response);
    };
    getUsername();
  }, []);

  //Alerta de análisis subido

  const [alertList, setAlertList] = useState([]);

  const addAlert = () => {
    setAlertList(alertList.concat(<AlertSuccess key={alertList.length} />));
  };

  //Saber el valor del file input

  const fileInput = useRef(null);

  // Funciones para setear los corners y desplegar los puntos.

  const mapField = useRef(null);
  const mapFieldContainer = useRef(null);

  const aCorner = useRef(null);
  const bCorner = useRef(null);
  const cCorner = useRef(null);
  const dCorner = useRef(null);

  const setFinalCorners = () => {
    let parentPos = mapField.current.getBoundingClientRect();

    let aCornerPos = aCorner.current.getBoundingClientRect();
    let bCornerPos = bCorner.current.getBoundingClientRect();
    let cCornerPos = cCorner.current.getBoundingClientRect();
    let dCornerPos = dCorner.current.getBoundingClientRect();

    let relativePos = { A: {}, B: {}, C: {}, D: {} };

    relativePos.A.y = aCornerPos.top - parentPos.top;
    relativePos.B.y = bCornerPos.top - parentPos.top;
    relativePos.C.y = cCornerPos.top - parentPos.top;
    relativePos.D.y = dCornerPos.top - parentPos.top;

    relativePos.A.x = aCornerPos.left - parentPos.left;
    relativePos.B.x = bCornerPos.left - parentPos.left;
    relativePos.C.x = cCornerPos.left - parentPos.left;
    relativePos.D.x = dCornerPos.left - parentPos.left;

    console.log(relativePos);

    return relativePos;
  };

  return (
    <>
      <div className="wrapper-r">
        <EndUseNavbar
          grabarId="grabar"
          análisisId=""
          ayudaId=""
          userName={userName}
        />
        <div className="form-header">
          <motion.div
            className="form-header-content"
            initial={{
              opacity: 0,
              y: 75,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.3,
                type: "tween",
                ease: "easeOut",
                duration: 0.75,
              },
            }}
            viewport={{
              once: true,
            }}
          >
            <p>¿Algúna cosa metemos áca o lo quitamos?</p>
            <h1>Sube un nuevo análisis</h1>
          </motion.div>
        </div>
        <motion.div
          className="divider-r"
          animate={{
            width: "45%",
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
          }}
        ></motion.div>
        <motion.div
          className="form-container"
          initial={{
            opacity: 0,
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.5,
              type: "tween",
              ease: "easeOut",
              duration: 0.75,
            },
          }}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={(values, formikHelpers) => {
              useAxios(values);
              //console.log(values);
              setFileName("");
              formikHelpers.resetForm();
            }}
            validationSchema={object({
              title: string().required("Ingrese un título para  el análisis"),
              type: string().required("Ingrese el tipo de análisis"),
              date: date().required("Ingrese la fecha del evento"),
              file: mixed().required("Ingrese un video a analizar")
            })}
          >
            {({ setFieldValue, errors, isValid, touched, dirty, values }) => (
              <Form autoComplete="off">
                <Field
                  name="title"
                  type="text"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Título del análisis"
                  size="normal"
                  error={Boolean(errors.title) && Boolean(touched.title)}
                  helperText={Boolean(touched.title) && errors.title}
                />
                <TypeField name="type" label="Tipo de análisis" />
                <Field
                  name="rival"
                  type="name"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Rival (opcional)"
                  size="normal"
                />
                <Field
                  name="date"
                  type="date"
                  as={TextField}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  color="primary"
                  label="Fecha del evento"
                  size="normal"
                  error={Boolean(errors.date) && Boolean(touched.date)}
                  helperText={Boolean(touched.date) && errors.date}
                />
                <div className="file-box-container">
                  <input
                    id="file-button"
                    name="file"
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      setFieldValue("file", e.currentTarget.files[0]);
                      setFileName(e.currentTarget.files[0].name);
                      const video = URL.createObjectURL(e.target.files[0]);
                      setCurrentVideo(video);
                    }}
                    ref={fileInput}
                  />
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M51.76 19.7606L38.88 6.88065C37.8933 5.89398 36.5333 5.33398 35.12 5.33398H16C13.0666 5.33398 10.6933 7.73398 10.6933 10.6673L10.6666 53.334C10.6666 56.2673 13.04 58.6673 15.9733 58.6673H48C50.9333 58.6673 53.3333 56.2673 53.3333 53.334V23.5473C53.3333 22.134 52.7733 20.774 51.76 19.7606ZM39.4666 40.0006H34.6666V48.0006C34.6666 49.4673 33.4666 50.6673 32 50.6673C30.5333 50.6673 29.3333 49.4673 29.3333 48.0006V40.0006H24.56C23.36 40.0006 22.7733 38.5606 23.6266 37.734L31.0933 30.294C31.6266 29.7873 32.4533 29.7873 32.9866 30.294L40.4266 37.734C41.2266 38.5606 40.64 40.0006 39.4666 40.0006V40.0006ZM37.3333 24.0006C35.8666 24.0006 34.6666 22.8007 34.6666 21.334V9.33398L49.3333 24.0006H37.3333Z"
                      fill="#4A5258"
                    />
                  </svg>
                  Arrastre o busque un video a analizar haciendo click aquí
                  <span>
                    {values.file === null
                      ? "Por ahora ningún video ha sido seleccionado"
                      : values.file === undefined
                      ? "Por ahora ningún video ha sido seleccionado"
                      : `Video: ${fileName}`}
                  </span>
                </div>
                <motion.div className="court-map-field" ref={mapFieldContainer}>
                  <motion.div
                    drag
                    whileTap={{ cursor: "grabbing" }}
                    whileDrag={{ scale: 1.5 }}
                    className="corner"
                    dragConstraints={mapFieldContainer}
                    dragMomentum={false}
                    style={{zIndex: 100, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                    ref={aCorner}
                  >
                    <div className="center">+</div>
                  </motion.div>
                  <motion.div
                    drag
                    whileTap={{ cursor: "grabbing" }}
                    whileDrag={{ scale: 1.5 }}
                    className="corner"
                    dragConstraints={mapFieldContainer}
                    dragMomentum={false}
                    style={{zIndex: 100, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                    ref={bCorner}
                  >
                    <div className="center">+</div>
                  </motion.div>
                  <motion.div
                    drag
                    whileTap={{ cursor: "grabbing" }}
                    whileDrag={{ scale: 1.33 }}
                    className="corner"
                    dragConstraints={mapFieldContainer}
                    dragMomentum={false}
                    style={{zIndex: 100, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                    ref={cCorner}
                  >
                    <div className="center">+</div>
                  </motion.div>
                  <motion.div
                    drag
                    whileTap={{ cursor: "grabbing" }}
                    whileDrag={{ scale: 1.33 }}
                    className="corner"
                    dragConstraints={mapFieldContainer}
                    dragMomentum={false}
                    style={{zIndex: 100, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                    ref={dCorner}
                  >
                    <div className="center">+</div>
                  </motion.div>
                  <video src={currentVideo} ref={mapField} width="100%" height="100%"/>
                </motion.div>
                {/* Transformar en un input normal */}
                <ButtonGroup fullWidth>
                  <Button
                    onClick={() => {
                      setCorners(setFinalCorners());
                    }}
                    startIcon={<SaveIcon />}
                    sx={{
                      fontWeight: 600,
                      textTransform: "capitalize",
                      fontSize: "1em",
                      height: "50px",
                      padding: 0,
                      borderRadius: "5px",
                    }}
                  >
                    Guardar Posición
                  </Button>
                </ButtonGroup>
                <Field
                  name="corners"
                  type="text"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Esquinas de la cancha"
                  size="normal"
                  error={Boolean(errors.corners) && Boolean(touched.corners)}
                  helperText={Boolean(touched.corners) && errors.corners}
                  /*
                  style={{
                    position: "absolute",
                    top: "-100px",
                    left: "-100px",
                    opacity: "0",
                  }}
                  */
                  /*
                  value={
                    (corners === null
                      ? "no hay valores"
                      : "hay valores:" + corners[0].x,
                    corners[0].y,
                    corners[1].x,
                    corners[1].y,
                    corners[2].x,
                    corners[2].y,
                    corners[3].x,
                    corners[3].y)
                  }
                  */
                />
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  disabled={!dirty || !isValid}
                  onClick={addAlert}
                  sx={{
                    fontWeight: 600,
                    textTransform: "capitalize",
                    fontSize: "1em",
                    height: "50px",
                    padding: 0,
                    borderRadius: "10px",
                  }}
                >
                  Subir análisis
                </Button>
              </Form>
            )}
          </Formik>
        </motion.div>
        {alertList}
      </div>
    </>
  );
}

export default RecordPage;

/* 

https://codesandbox.io/s/d2swu?file=/src/Circle.ts

Problemas:

- Uso un switch para mostrar el contenido dependiendo del paso activo pero este esta por fuera del formik tag lo que me impide de usar el setFieldValue para con el input file.
- No se marca el button de next como tipo submit aunque yo le ponga la condición para que así sea en el último paso.

Soluciones: 

- Que cambie nomás la hoja de estilos dependiendo el contenido estando todo el form dividido en divs.

Código del form multi-step:

  // Los diferentes labels de los pasos del formulario, haremos un mapeo para recorrerlo y setearlos como título de cada paso correspondiente.

  const steps = ['Datos del análisis', 'Video a analizar', 'Selecciona las esquinas'];

  //Formulario por pasos cambios de estado y handleNext/handleBack/handleReset function

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = ()=>{
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = ()=>{
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  const handleReset = () => {
    setActiveStep(0);
  };

  //Función para mostrar los diferentes campos dependiendo del paso activo.

  const InStep = (activeStep) =>{

    switch(activeStep){
      
      case 0 : return (
      <>
        <Field
          name="title"
          type="name"
          as={TextField}
          variant="outlined"
          color="primary"
          label="Título"
          size="normal"
        />
        <TypeField name="type" label="Tipo de análisis" />
        <Field
          name="rival"
          type="name"
          as={TextField}
          variant="outlined"
          color="primary"
          label="Rival (opcional)"
          size="normal"
        />
        <Field
          name="date"
          type="date"
          as={TextField}
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          color="primary"
          label="Fecha del evento"
          size="normal"
        />
      </>
    );
    case 2: return (
      <>
        <Field
          name="corners"
          type="text"
          as={TextField}
          variant="outlined"
          color="primary"
          label="Esquinas de la cancha"
          size="normal"
        />
      </>
    );
    case 1: return (
      <>
        <input
          name="file"
          type="file"
          accept="video/*"
          onChange={(e)=>{setFieldValue("file", e.currentTarget.files[0])}}
        />
      </>
    )}
  }

  //Valores iniciales de los campos para colocar en el Formik "initialValues"

  const initialValues = {
    title: '',
    type: '',
    rival: '',
    date: '',
    file: '',
    corners:''
  }

  //Función para fetchear los valores finales del formulario

  const useAxios = async (finalValues)=>{
    const response = await axios.post('http://localhost:4000/UploadVideo', JSON.stringify(finalValues), {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
    console.log(response)
  }

  //Ver el estado del paso activo tras cada cambio en su estado.

  useEffect(()=>{
    console.log(activeStep);
  })

  return (
    <>
      <div className="wrapper-r">
        <EndUseNavbar grabarId="grabar" análisisId="" ayudaId="" />
        <div className="form-header">
          <div className="form-header-content">
            <p>Formulario por pasos</p>
            <h1>Sube un nuevo análisis</h1>
          </div>
        </div>
        <div className="form-container">
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              useAxios(values);
              console.log(values);
            }}
          >
            <Form autoComplete="off">
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <Fragment>
                  <p>Análisis subido</p>
                  <Button onClick={handleReset}>Subir un nuevo análisis</Button>
                </Fragment>
              ) : (
                <Fragment>
                  {InStep(activeStep)}
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Volver
                  </Button>
                  <Button onClick={handleNext} type= {activeStep === steps.length -1 ? 'submit' : 'button'}>
                    {activeStep === steps.length - 1
                      ? "Subir análisis"
                      : "Siguiente"}
                  </Button>
                </Fragment>
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );



*/
