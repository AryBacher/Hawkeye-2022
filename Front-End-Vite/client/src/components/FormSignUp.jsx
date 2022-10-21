import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { object, string, ref } from "yup";
import "../stylesheets/FormSignUpStylesheets/Form.css";

function FormSignUp() {
  let navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const useAxios = async (finalValues) => {
    console.log(finalValues);
    const response = await axios.post(
      "http://localhost:4000/SignUp",
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
      return navigate("/LogIn");
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, formikHelpers) => {
          useAxios(values);
          console.log(values);
          formikHelpers.resetForm();
        }}
        validationSchema={object({
          name: string().required("Ingrese su nombre"),
          email: string().required("Ingrese su email").email("Email inválido"),
          password: string()
            .required("Ingrese su contraseña")
            .min(8, "Mínimo 8 caracateres"),
          passwordConfirm: string()
            .required("Ingrese su contraseña")
            .oneOf([ref("password")], "Las contraseñas no coinciden"),
        })}
      >
        {({ errors, isValid, touched, dirty }) => (
          <Form autoComplete="off">
            <Field
              name="name"
              type="name"
              as={TextField}
              variant="outlined"
              color="primary"
              label="Nombre"
              size="normal"
              error={Boolean(errors.name) && Boolean(touched.name)}
              helperText={Boolean(touched.name) && errors.name}
            />

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

            <Field
              name="passwordConfirm"
              type="password"
              as={TextField}
              variant="outlined"
              color="primary"
              label="Confirmar contraseña"
              size="normal"
              error={
                Boolean(errors.passwordConfirm) &&
                Boolean(touched.passwordConfirm)
              }
              helperText={
                Boolean(touched.passwordConfirm) && errors.passwordConfirm
              }
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

export default FormSignUp;
