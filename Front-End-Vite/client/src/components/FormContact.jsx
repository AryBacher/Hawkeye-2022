import React from 'react'
import { TextField, Button } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { object, string } from "yup";

function FormContact() {

  const initialValues = {
      email: "",
      text: "",
  }

  return (
    <>
        <Formik
          initialValues={initialValues}
          validationSchema={object({
            email: string()
              .required("Ingrese su email")
              .email("Email inválido"),
            text: string()
              .required("Ingrese su mensaje, duda, recomendación o lo que desee.")
          })}
        >
          {({ errors, isValid, touched, dirty }) => (
            <Form
              action='/'
              method= 'POST'
            >
                <Field
                name="email"
                type="email"
                autoFocus
                as={TextField}
                variant="standard"
                color="primary"
                label="Email"
                size="normal"
                error={Boolean(errors.email) && Boolean(touched.email)}
                helperText={Boolean(touched.email) && errors.email}
                />

                <Field
                name="text"
                type="text"
                as={TextField}
                variant="standard"
                color="primary"
                label="Mensaje"
                size="normal"
                error={Boolean(errors.text) && Boolean(touched.text)}
                helperText={Boolean(touched.text) && errors.text}
                />
                <Button
                variant="contained"
                type="submit"
                size="large"
                disabled={!dirty || !isValid}
                >
                Enviar mensaje
                </Button>
            </Form>
          )}
        </Formik>
    </>
  )
}

export default FormContact