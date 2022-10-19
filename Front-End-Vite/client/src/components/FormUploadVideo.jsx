import React from 'react';
import { Formik, Form, useFormik, Field} from 'formik';
import { Step, Stepper, StepLabel, TextField, Button } from '@mui/material';
import {useState, Fragment, useContext} from 'react';
import * as Yup from 'yup';
import TitleField from './Form UploadVideo Components/TitleField';
import TypeField from './Form UploadVideo Components/TypeField';
import DatePicker from './Form UploadVideo Components/DatePicker';
import DatePickerPro from './Form UploadVideo Components/DatePickerPro';
import CheckboxOutstanding from './Form UploadVideo Components/CheckboxOutstanding';
import BtnSubmit from './Form UploadVideo Components/BtnSubmit';

function FormUploadVideo() {

  // Los diferentes labels de los pasos del formulario, haremos un mapeo para recorrerlo y setearlos como título de cada paso correspondiente.

  const steps = [
    "Datos del análisis",
    "Video a analizar",
    "Selecciona las esquinas",
  ];

  //Formulario por pasos cambios de estado y handleNext/handleBack/handleReset function

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  //Valores iniciales del paso 1

  const initialValues1 = {
    title: "",
    type: "",
    rival: "",
    date: "",
  };

  //Valores iniciales del paso 2

  const initialValues2 = {
    file: null,
  };

  //Valores iniciales del paso 3

  const initialValues3 = {
    corners: "",
  };

  //Función para que dependiendo del paso activo retorne un determinado contenido

  const contentStep = (activeStep) => {
    switch (activeStep) {
      case 0:
        return (
          <div>
            <Formik
              initialValues={initialValues1}
              onSubmit={(finalValues) => {
                console.log(finalValues);
              }}
            >
              <Form>
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
              </Form>
            </Formik>
          </div>
        );
      case 1:
        return (
          <div>
            <Formik
              initialValues={initialValues2}
              onSubmit = {(finalValues)=>{
                console.log(finalValues)
              }}
            >
              {(setFieldValue) => {
                <Form>
                  <input
                    name="file"
                    type="file"
                    accept="video/*"
                    onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                  />
                </Form>;
              }}
            </Formik>
          </div>
        );
      case 2:
        return (
          <div>
            <Formik
              initialValues={initialValues3}
              onSubmit = {(finalValues)=>{
                console.log(finalValues)
              }}
            >
              <Form>
                <Field
                  name="corners"
                  type="text"
                  as={TextField}
                  variant="outlined"
                  color="primary"
                  label="Esquinas de la cancha"
                  size="normal"
                />
              </Form>
            </Formik>
          </div>
        );
    }
  };

  return (
    <div>
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
          {contentStep(activeStep)}
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
    </div>
  );
}

export default FormUploadVideo