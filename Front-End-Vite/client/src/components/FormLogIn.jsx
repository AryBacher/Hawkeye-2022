import React from "react";
import { TextField, Button } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { object, string, ref } from "yup";
import "../stylesheets/FormLogInStylesheets/Form.css";

function FormLogIn() {
  const initialValues = {
    email: "",
    password: "",
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, formikHelpers) => {
          console.log(values);
          formikHelpers.resetForm();
        }}
        validationSchema={object({
          email: string().required("Ingrese su email").email("Email inválido"),
          password: string()
            .required("Ingrese su contraseña")
            .min(8, "La contraseña debe ser de mínimo 8 caracateres"),
        })}
      >
        {({ errors, isValid, touched, dirty }) => (
          <Form>
            <Field
              name="email"
              type="email"
              autoFocus
              as={TextField}
              variant="outlined"
              color="primary"
              label="Email"
              size="normal"
              error={Boolean(errors.email) && Boolean(touched.email)}
              helperText={Boolean(touched.email) && errors.email}
            />

            <Field
              name="password"
              type="password"
              as={TextField}
              variant="outlined"
              color="primary"
              label="Contraseña"
              size="normal"
              error={Boolean(errors.password) && Boolean(touched.password)}
              helperText={Boolean(touched.password) && errors.password}
            />

            <Button
              variant="contained"
              type="submit"
              size="large"
              disabled={!dirty || !isValid}
            >
              Continuar
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default FormLogIn;
