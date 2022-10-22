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
import CloseIcon from '@mui/icons-material/Close';
import TypeField from "../components/Form UploadVideo Components/TypeField";
import { Form, Formik, Field, useFormik, useFormikContext } from "formik";
import { object, string,date, mixed } from "yup";
import { useState, Fragment, useEffect, useRef } from "react";
import {motion} from 'framer-motion';
import axios from "axios";
import AlertSuccess from "../components/AlertSuccess";
import { height } from "@mui/system";
import { useParams } from "react-router-dom"



function RecordPage() {

  const { id } = useParams()

  //Valores iniciales de los campos para colocar en el Formik "initialValues".

  const initialValues = {
    title: "",
    type: "",
    rival: "",
    date: "",
    file: null,
    corners: "",
  };

  //Hacer una referencia al input type file para que al clickear otro elemento realmente estes clickeando el input.

  const inputFile = useRef(null);

  const handleInputFile = (e) => {
    inputFile.current.click();
  };
  
  //Sacar el estado del nombre de archivo para así luego usarlo en el span del input customizado.

  const [fileName, setFileName] = useState("");

  //Función para fetchear los valores finales del formulario.

  const useAxios = async (finalValues) => {
    console.log(finalValues)
    const formData = new FormData()
    formData.append('idUsuario', id)
    formData.append('title', finalValues.title)
    formData.append('type', finalValues.type)
    formData.append('rival', finalValues.rival)
    formData.append('date', finalValues.date)
    formData.append('video', finalValues.file)
    formData.append('corners', finalValues.corners)
    console.log([...formData])
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

  //Alerta de análisis subido

  const [alertList, setAlertList]  = useState([]);

  const addAlert = ()=>{
    setAlertList(alertList.concat(<AlertSuccess key={alertList.length} />));
  }
  

  return (
    <>
      <div className="wrapper-r">
        <EndUseNavbar grabarId="grabar" análisisId="" ayudaId="" />
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
            <p>Formulario por pasos</p>
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
                  ref={inputFile}
                />
                <div className="file-box" onClick={handleInputFile}>
                  Arrastre o busque un video a analizar haciendo click aquí
                  <span>
                    {fileName === ""
                      ? "Por ahora ningún video ha sido seleccionado"
                      : `Video: ${fileName}`}
                  </span>
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
