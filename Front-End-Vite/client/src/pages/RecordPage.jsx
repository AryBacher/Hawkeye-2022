import React from 'react'
import '../stylesheets/RecordPageStylesheets/RecordPage.css';
import EndUseNavbar from '../components/EndUseNavbar';
import { TextField, Button, Step, Stepper, StepLabel} from "@mui/material";
import { fontWeight } from '@mui/system';
import TypeField from '../components/Form UploadVideo Components/TypeField';
import CheckboxOutstanding from '../components/Form UploadVideo Components/CheckboxOutstanding';
import { Form, Formik, Field} from "formik";
import { object, string, ref, date, mixed} from "yup";
import {useState, Fragment} from 'react';
import axios from 'axios';


function RecordPage() {

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

  //Función para que dependiendo el paso devuelva los inputs correspondientes.

  const inStep = (activeStep)=>{
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
      case 1: return (
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
      case 2: return (
        <>
          <input
            name="file"
            type="file"
            accept="video/*"
            onChange={(event) => {
              setFieldValue("file", event.currentTarget.files[0]);
            }}
          />
        </>
      );
  }}

  //Valores iniciales de los campos para colocar en el Formik "initialValues"

  const initialValues = {
    title: '',
    type: '',
    rival: '',
    date: '',
    file: null,
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
            onSubmit={(values, formikHelpers) => {
              useAxios(values);
              console.log(values);
              formikHelpers.resetForm();
            }}
          >
            <Form autoComplete="off">
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
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
                  {inStep(activeStep)}
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Volver
                  </Button>
                  <Button onClick={handleNext} type="submit">
                    {activeStep === steps.length - 1
                      ? "Subir nuevo análisis"
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
}

export default RecordPage;


/*

<input id="file" name="file" type="file" onChange={(event) => {
  setFieldValue("file", event.currentTarget.files[0]);
}} />

*/

/*

                  <div>
                    <Field
                      name='title'
                      type='name'
                      as={TextField}
                      variant="outlined"
                      color="primary"
                      label="Título"
                      size="normal"
                    />
                    <TypeField
                      name="type"
                      label="Tipo de análisis"
                    />
                    <Field
                      name='rival'
                      type='name'
                      as={TextField}
                      variant="outlined"
                      color="primary"
                      label="Rival (opcional)"
                      size="normal"
                    />
                    <Field
                      name='date'
                      type='date'
                      as={TextField}
                      variant="outlined"
                      InputLabelProps = {{
                        shrink: true
                      }}
                      color="primary"
                      label="Fecha del evento"
                      size="normal"
                    />
                  </div>
                  <div>
                    <input 
                      name='file' 
                      type="file" 
                      accept='video/*' 
                      onChange={(event) => { setFieldValue("file", event.currentTarget.files[0]); }}
                    />
                  </div>
                  <div>
                    <Field
                      name='corners'
                      type='text'
                      as={TextField}
                      variant="outlined"
                      color="primary"
                      label="Esquinas de la cancha"
                      size="normal"
                    />
                    <CheckboxOutstanding
                      name="outstanding"
                      label="Marcar como análisis destacado"
                    />
                  </div>
                  <Button 
                    variant="contained"
                    type="submit"
                    size="large"
                    sx={{height: '50px', fontWeight: 600, textTransform: 'capitalize', borderRadius: '10px'}}
                  >
                    Subir análisis
                  </Button>

*/
