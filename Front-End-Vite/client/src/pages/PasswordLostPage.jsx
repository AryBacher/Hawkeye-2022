import React from "react";
import { TextField, Button } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { object, string } from "yup";
import LogoBig from "../components/LogoBig";
import "../stylesheets/PasswordLostPageStylesheets/PasswordLostPage.css";
import axios from 'axios';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function RecoverPasswordPage() {
  const axiosPrivate = useAxiosPrivate();
  const InitialValues = {
    email: "",
  };

  const RecoverPassword = async (InitialValues) =>{
    const response = await axiosPrivate.post(
      "/SendEmail",
      JSON.stringify(InitialValues),
    );
    console.log(response);
  }
  return (
    <>
      <div className="wrapper-rp">
        <section className="hero">
          <div className="Logo-container">
            <LogoBig/>
          </div>
          <h1 className="title-rp">Recuperar Contraseña</h1>
          <p className="par-rp">
           Ingrese su dirección de correo electrónico para reestablecer su contraseña.
          </p>
          <Formik
            initialValues={InitialValues}
            onSubmit={(values, formikHelpers) => {
              RecoverPassword(values);
              console.log(values);
              formikHelpers.resetForm();
              alert(
                "Su email ha sido enviado, si no lo encuentra intentelo de vuelta."
              );
            }}
            validationSchema={object({
              email: string()
                .required("Ingrese su email")
                .email("Email inválido"),
            })}
          >
            {({ errors, isValid, touched, dirty }) => (
              <Form autoComplete="off">
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
                <Button
                  variant="contained"
                  type="submit"
                  size="large"
                  disabled={!dirty || !isValid}
                >
                  Recuperar contraseña
                </Button>
              </Form>
            )}
          </Formik>
        </section>
      </div>
    </>
  );
}

export default RecoverPasswordPage;
