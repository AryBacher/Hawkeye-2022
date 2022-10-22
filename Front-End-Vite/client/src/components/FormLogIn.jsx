import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { object, string } from "yup";
import "../stylesheets/FormLogInStylesheets/form.css";

function FormLogIn() {
  let navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const useAxios = async (finalValues) => {
    console.log(finalValues);
    const response = await axios.post(
      "http://localhost:4000/LogIn",
      JSON.stringify(finalValues),
      {
        headers: { "Content-Type": "application/JSON" },
        withCredentials: true,
      }
    );
    console.log(response);

    const allowedUser = response.data.redirect;
    console.log(allowedUser);
    if (allowedUser) {
      return navigate(`/Analysis/${response.data.idUsuario}`);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, formikHelpers) => {
          useAxios(values);
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
          <Form autoComplete="off">
            <Field
              name="email"
              type="email"
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
            <a href="/RecoverPassword">¿Olvidaste tu contraseña?</a>
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
