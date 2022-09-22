import React from "react";
import Logo from "../components/Logo";
import { TextField, Button } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { object, string } from "yup";
import "../stylesheets/PasswordLostPageStylesheets/PasswordLostPage.css";

function RecoverPasswordPage() {
  const InitialValues = {
    email: "",
  };
  return (
    <>
      <div className="wrapper-rp">
        <section className="hero">
          <div className="Logo-container">
            <Logo className="Logo" />
          </div>
          <h1 className="title-rp">Recuperar Contraseña</h1>
          <p className="par-rp">
            Ingrese su mail para poder enviar un correo de <br /> verificación
            para crear una nueva contraseña.
          </p>
          <Formik
            initialValues={InitialValues}
            onSubmit={(values, formikHelpers) => {
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
