import React from 'react'
import { TextField, Button } from "@mui/material";
import { Form, Formik, Field } from "formik";
import { object, string, ref } from "yup";
import LogoBig from "../components/LogoBig";
import '../stylesheets/ConfirmNewPasswordPageStylesheets/ConfirmNewPasswordPage.css'

function ConfirmPasswordPage() {

  const initialValues = {
    password: "",
    confirmPassword: "",
  }

  return (
    <>
      <div className='wrapper-cnp'>
        <section className="hero">
            <div className="Logo-container">
              <LogoBig/>
            </div>
            <h1 className="title-rp">
              Confirmar nueva contraseña
            </h1>
            <p className="par-rp">
              Ingrese su nueva contraseña y luego confirmela para actualizarla.
            </p>
            <Formik
            initialValues={initialValues}
              onSubmit={(values, formikHelpers) => {
                console.log(values);
                formikHelpers.resetForm();
                alert(
                  "Su contraseña ha sido cambiada exitosamente."
                );
              }}
              validationSchema={object({
                password: string()
                  .required("Ingrese su contraseña")
                  .min(8, "La contraseña debe ser de mínimo 8 caracateres"),
                passwordConfirm: string()
                  .required("Ingrese su contraseña")
                  .oneOf([ref("password")], "Las contraseñas no coinciden"),
              })}
            >
            {({ errors, isValid, touched, dirty }) => (
              <Form>
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
                  Recuperar contraseña
                </Button>
              </Form>
            )}
          </Formik>
        </section>
      </div>
    </>
  )
}

export default ConfirmPasswordPage