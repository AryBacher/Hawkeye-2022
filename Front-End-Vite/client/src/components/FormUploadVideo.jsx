import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { string } from 'yup/lib/locale';
import TitleField from './Form UploadVideo Components/TitleField';

function FormUploadVideo() {

  //Valores iniciales del formulario.

  const initialValues = {
    title: '',
    type: false,
    rival: '',
    date: '',
    file: ''
  };

  //Esquema de validación desde el sector cliente.
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Inrese un título'),
    type: Yup.boolean()
      .required('Ingrese el tipo de análisis'),
    rival: Yup.string()
      .required('Ingrese un rival, requerimiento de partido'),
    date: Yup.string()
      .required('Ingrese fecha del partido/entrenamiento'),
    file: Yup.string()
      .required('ingrese el archivo a analizar')
    
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
            name="title"
            label="Título del análisis"
          />

        </Form>
      </Formik>
    </>
  )
}

export default FormUploadVideo