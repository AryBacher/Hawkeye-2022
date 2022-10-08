import React from 'react';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import TitleField from './Form UploadVideo Components/TitleField';
import TypeField from './Form UploadVideo Components/TypeField';
import DatePicker from './Form UploadVideo Components/DatePicker';
import CheckboxOutstanding from './Form UploadVideo Components/CheckboxOutstanding';
import BtnSubmit from './Form UploadVideo Components/BtnSubmit';

function FormUploadVideo() {

  //Valores iniciales del formulario.

  const initialValues = {
    title: '',
    type: '',
    rival: '',
    date: '',
    outstanding: false
  };

  //Esquema de validación desde el sector cliente.
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Inrese un nombre para el análisis'),
    type: Yup.string()
      .required('Ingrese el tipo de análisis'),
    date: Yup.date()
      .required('Ingrese la fecha del partido/entrenamiento'),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, formikHelpers)=>{
          console.log(values);
          formikHelpers.resetForm();
        }}
      >
      <Form>
        <TitleField
          autoFocus
          name="title"
          label="Nombre del análisis"
        />
        <TypeField
          name="type"
          label="Tipo de análisis"
        />
        <TitleField
          name="rival"
          label="Rival (opcional)"
        />
        <DatePicker
          name="date"
          label="Fecha del partido/entrenamiento"
        />
        <CheckboxOutstanding
          name="outstanding"
          legend = "no se"
          label="Marcar como análisis destacado"
        />
        <BtnSubmit>
          Subir análisis
        </BtnSubmit>
      </Form>
    
      </Formik>
    </>
  )
}

export default FormUploadVideo