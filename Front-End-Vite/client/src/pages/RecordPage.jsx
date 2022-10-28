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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TypeField from "../components/Form UploadVideo Components/TypeField";
import { Form, Formik, Field, useFormik, useFormikContext } from "formik";
import { object, string, date, mixed } from "yup";
import { useState, Fragment, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import AlertSuccess from "../components/AlertSuccess";
import { height } from "@mui/system";
import { useParams } from "react-router-dom";

function RecordPage() {
  const { id } = useParams();

  //Valores iniciales de los campos para colocar en el Formik "initialValues".

  const initialValues = {
    title: "",
    type: "",
    rival: "",
    date: "",
    file: null,
    corners: "",
  };

  //Sacar el estado del nombre de archivo para así luego usarlo en el span del input customizado.

  const [fileName, setFileName] = useState("");

  const [userName, setUserName] = useState("");

  //Función para fetchear los valores finales del formulario.

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
    const response = await axios.post(
      "http://localhost:4000/UploadVideo",
      formData,
      {
        //headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );
    console.log(response);
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

  // Referenciar al padre del canvas para que adopte su altura y anchura.

  const canvas = useRef(null);
  const parentCanvas = useRef(null);

  const [corners, setCorners] = useState([]);

  const setCornerPosition = (e) => {
    setCorners(corners.concat({ x: e.clientX, y: e.clientY }));
    console.log(corners);
  };

  useEffect(() => {
    // Tomar estilos de la caja padre.

    const styles = getComputedStyle(parentCanvas.current);

    // Variables con altura y anchura del padre.

    const width = parseInt(styles.getPropertyValue("width"), 10);
    const height = parseInt(styles.getPropertyValue("height"), 10);

    // Setear la altura y anchura del padre.

    canvas.current.height = height;
    canvas.current.width = width;

    //Funciones para dibujar las esquinas

    const circle = canvas.current.getContext("2d");

    const drawCircle = (e) => {
      console.log("hola funco");
      circle.beginPath();
      circle.arc(e.x, e.y, 4, 0, Math.PI * 2);
      circle.fillStyle = "#4ECB71";
      circle.fill();
      circle.closePath();
    };

    drawCircle(corners);

  }, [corners]);

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
              file: mixed().required("Ingrese un video a analizar"),
              corners: string().required("Ingrese las esquinas de la cancha"),
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
                      //console.log(fileName);
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
                <div className="court-map-field" ref={parentCanvas}>
                  <canvas ref={canvas} onClick={setCornerPosition}></canvas>
                </div>
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
